# Feature Workflow: Authentication & Authorization

> **MVP Priority**: P0 · **Feature docs**: [README](./README.md) · **Status**: Blueprint
> **Sources**: [Authentication Architecture](../authentication-architecture.md) · [System Architecture Overview §5](../PawHaven-System-Architecture-Overview.md) · [Product Blueprint §2](../PawHaven-Product-Strategy-EN.md)

## 1. Overview

Users need accounts to report strays, claim cases, follow cases, apply for adoption,
and earn achievements. The platform uses **cookie-based JWT sessions** with role-based
authorization. Guests can browse everything publicly; only registered/volunteer/shelter
users can perform privileged actions.

## 2. Actors & Roles

| Role            | Permissions                                                              |
| --------------- | ------------------------------------------------------------------------ |
| Guest (public)  | Browse homepage, rescue cases, adoptable pets, stories, knowledge base   |
| Registered user | Report an animal, follow a case, apply for adoption, create profile      |
| Volunteer       | Claim rescue cases, update case status, manage availability/capabilities |
| Shelter staff   | Review adoption applications, publish adoption listings, write stories   |
| Admin           | Manage menus/routes/roles via bootstrap config, moderate content         |

## 3. End-to-End Flow

**Registration → Login → Authorized actions → Logout**

```mermaid
flowchart TD
    A[User opens app] --> B{Session cookie?}
    B -- no --> C[Gateway signs anonymous identity<br/>as internal JWT; @OptionalAuth reads allowed]
    B -- yes --> D[Gateway InternalJwtService<br/>resolves identity from JWT cookie]
    C --> E[User clicks Sign Up<br/>email + password + display name]
    E --> F[POST /api/auth/register]
    F --> G[auth-service creates user<br/>password hashed]
    G --> H[Profile returned to frontend]
    H --> I[User clicks Log In<br/>submits credentials]
    I --> J[POST /api/auth/login]
    J --> K{Valid credentials?}
    K -- no --> I
    K -- yes --> L[Issue signed JWT cookie]
    L --> D
    D --> M[Gateway signs typed InternalJwt as HS256 JWT<br/>x-gateway-jwt]
    M --> N[downstream InternalJwtGuard<br/>verifies internal JWT; handlers inject @InternalJwt() claims]
    D --> O{Token near expiry?}
    O -- yes --> P[POST /api/auth/refresh<br/>silent rotation]
    P --> D
    O -- no --> Q[Authorized actions continue]
    Q --> R[User clicks Log Out]
    R --> S[POST /api/auth/logout<br/>clear cookie + invalidate session]
```

## 4. Frontend

- Feature module: `Auth` (register page, login page, profile menu). Protected routes live under the authenticated parent route (`requireUser` loader — see [route_authentication.md](../route_authentication.md)).
- Boot-time verification: `GET /auth/me` to restore session on page reload.
- Public vs. protected route split is driven by the bootstrap `routes` config (see [11-bootstrap](./11-bootstrap.md)).

## 5. Backend

- **Service**: `auth-service` (register, login, logout, refresh, `/me`).
- **Gateway**: `InternalJwtService` resolves the browser session (F1-F4) and signs typed `InternalJwt` as a compact HS256 internal JWT (`x-gateway-jwt`, 45s TTL); the allowlisted proxy forwards it to the target service.
- **Downstream**: the global `InternalJwtGuard` verifies the signed internal JWT; endpoint policy lives with each handler — auth `@Public` on login/register/refresh, core GET reads `@OptionalAuth`, writes default-authenticated. Handlers inject the identity with the `@InternalJwt()` param decorator, never from request headers. `@OptionalAuth()` reads use `@InternalJwt({ allowAnonymous: true })` and branch on `claims.kind`; authenticated handlers annotate `AuthenticatedInternalJwt` to reach `claims.sub`.

## 6. Data Model

- `users` (auth-service): email (unique), displayName, passwordHash, roles, timestamps.
- Session/token state lives in the signed JWT + optional server-side session store.

## 7. State Machine / Rules

- Tokens expire (short-lived access + refresh rotation).
- Password reset is a later phase (out of MVP).
- Roles are assigned on signup (`registered`); volunteer/shelter roles are granted by
  onboarding/volunteer opt-in flows.

## 8. Acceptance Criteria

- [ ] Register, login, logout, refresh all work end-to-end through the gateway.
- [ ] Protected API calls fail with 401 when no/invalid cookie; succeed when valid.
- [ ] Every proxied request carries a signed `x-gateway-jwt` header (HS256); downstream rejects tampered/expired/wrong-audience claims with 401.
- [ ] Guests can browse all public pages without any session.
- [ ] Role-based guards reject volunteer-only actions for registered users.

## 9. Related Docs

- [Authentication Architecture](../authentication-architecture.md)
- [Route Authentication](../route_authentication.md)
- [System Architecture Overview §5 (API Gateway)](../PawHaven-System-Architecture-Overview.md)
- [Product Blueprint §2 (User Model)](../PawHaven-Product-Strategy-EN.md)
