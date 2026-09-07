# Route-Level Authentication (Frontend → Backend)

## Overview

Protected routes are guarded by an **authenticated parent route** in the React Router v7 Data Mode route tree. Its `requireUser` loader verifies authentication by priming the `/auth/me` query via `queryClient.ensureQueryData(...)`, and redirects to `/auth/login?redirect=…` when verification fails. Since the access token is stored in an `httpOnly` cookie (unreadable by JavaScript), the only safe way to verify identity is through a server-side check.

> This replaced the previous `RequireAuth` component approach, which wrapped each protected page and redirected using React Router location `state`.

## Architecture Flow

```mermaid
flowchart LR
    subgraph Frontend
        Browser[Browser]
        Router[React Router v7 Data Mode]
        Guard[authenticated route / requireUser loader]
        Login[Login page reads ?redirect]
    end

    subgraph Backend
        Gateway[API Gateway]
        RefreshGuard[JWT Refresh Guard]
        VerifyGuard[JWT Verification Guard]
        AuthService[Auth Service]
    end

    Browser --> Router: User visits protected route
    Router --> Guard: Run requireUser loader
    Guard --> Gateway: GET /auth/me (auto Cookie)
    Gateway --> RefreshGuard: Check access token
    RefreshGuard --> VerifyGuard: Validate token
    VerifyGuard --> AuthService: Proxy request
    AuthService --> Gateway: { userId, email }
    Gateway --> Guard: 200 OK
    Guard --> Router: Authenticated → render children

    Guard -.->|failure| Login: redirect('/auth/login?redirect=...')
```

## Step-by-Step Flow

### Step 1: Route Definition (frontend-owned)

- Routes are defined statically in the frontend — the backend no longer decides which component renders.
- Protected routes are nested under a single authenticated parent route, so protection is expressed by position in the tree rather than by a database flag:

```tsx
// apps/frontend/portal/src/router/router.tsx
{
  id: 'authenticated',
  loader: requireUser,
  Component: AuthenticatedLayout,
  children: [reportAnimalRoute],
}
```

- The legacy `handle.isRequireUserLogin` route flag is no longer read by the frontend. The backend still stores menu/route permissions (see Follow-ups).

### Step 2: Auth Guard (`requireUser` loader)

```ts
// apps/frontend/portal/src/features/Auth/route.tsx
export const requireUser = async ({ request }: LoaderFunctionArgs) => {
  const { pathname, search } = new URL(request.url);
  const redirectTo = `${routePaths.login}?${routeSearchParams.redirect}=${encodeURIComponent(`${pathname}${search}`)}`;

  try {
    await getQueryClient().ensureQueryData(
      currentUserQueryOptions(getCurrentUserId()),
    );
  } catch {
    throw redirect(redirectTo);
  }

  return null;
};
```

- Runs **once for the entire protected subtree** — child routes do not re-check and do not trigger duplicate `/auth/me` calls.
- Uses the same query key as `useCurrentUser`, so an already-cached user is reused.
- The guard runs before render: a protected page never mounts for an unauthenticated user.

### Step 3: Login Redirect

`Login` reads the intended destination from the `?redirect` search param:

```tsx
const [searchParams] = useSearchParams();
const from = searchParams.get(routeSearchParams.redirect) ?? routePaths.home;
```

Using a search param (instead of location `state`) keeps the target visible in the URL, so it survives refreshes and can be shared.

### Step 4: Backend JWT Verification (Gateway)

1. The `/auth/me` request automatically includes the `access_token` httpOnly cookie.
2. Gateway intercepts the request:
   - `JwtRefreshGuard` runs first: checks if the access token is missing, invalid, expiring soon, or past the absolute session deadline (30 days from `sessionStartedAt`). If a refresh is needed, it calls `/auth/refresh` (single-flight for concurrent requests); if the refresh is rejected, auth cookies are cleared and the request fails with 401.
   - `JwtVerificationGuard` runs second: validates the JWT signature and `type: 'access'` claim, checks the session deadline and the jti denylist (revoked on logout), extracts the user payload, and attaches `req.user`.
3. On success, gateway proxies the request to `AuthService` with `X-Auth-User-Id` and `X-Auth-User-Email` headers.
4. **After 30 days**, `/auth/me` returns 401 `sessionExpired` regardless of refresh-token validity — `requireUser` redirects to `/auth/login` and the user must authenticate again.

### Step 5: Auth Service Verification

`AuthService.getMe()` reads the `access_token` cookie directly from the request, verifies it, and returns `{ userId, email }`. The gateway already validated the token signature, so this endpoint just retrieves the user payload.

### Step 6: Dispatch & Render

- `useCurrentUser` (React Query) exposes the cached result; components read it with `useQuery`.
- The profile is dispatched to Redux by the components that consume `useCurrentUser`.
- On failure the loader throws `redirect(...)`, so the protected page never renders.

## Key Design Decisions

| Decision                                              | Reason                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Frontend doesn't read httpOnly cookie                 | httpOnly prevents JavaScript access; protects against XSS token theft                                |
| Verify via `/auth/me` API instead of local state      | Backend is the only source of truth; detects expired, revoked, or tampered tokens                    |
| Session hard-caps at 30 days via `/auth/me` 401       | Absolute session bound: refresh may slide for 7 days, but after `sessionExpiresAt` login is required |
| Guard is a **router loader**, not a wrapper component | Runs before render; no loading flash, no partially mounted protected page                            |
| Single guard on the authenticated **parent route**    | Children inherit protection; avoids repeated `/auth/me` calls per page                               |
| Loader reuses `useCurrentUser`'s query key            | One cache entry shared by the guard and the UI — no duplicate requests                               |
| Redirect target stored in `?redirect` search param    | Survives refresh/share; no reliance on router location state                                         |
| `useCurrentUser` has no side effects in queryFn       | Avoids ESLint exhaustive-deps warnings; dispatch logic lives in `useEffect` in consuming components  |

## Follow-ups

- Route `handle.permission` metadata for UX-level permission gating (backend remains the security boundary).
- The backend still returns a `routers` tree in the home response that the frontend no longer consumes — candidate for removal.
