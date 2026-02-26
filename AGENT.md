# AGENT.md

## Purpose

This document defines the behavioral boundaries, code standards, and collaboration rules
for AI agents and automated systems interacting with the pawHaven repository.

Agents must follow these constraints strictly to ensure architectural consistency,
security, and maintainability.

---

## Project Context

pawHaven is a full-stack stray animal rescue platform.

Tech stack:

- Frontend: React (Monorepo, pnpm)
- Backend: NestJS microservices (RPC-based communication)
- CI/CD: GitHub Actions
- Package manager: pnpm

---

## Monorepo Structure Rules

The repository is managed via pnpm workspaces.

Agents MUST:

- Respect existing workspace boundaries.
- Avoid creating cross-package dependencies without updating workspace config.
- Reuse shared modules from `shared` instead of duplicating logic.
- Never introduce circular dependencies.

Agents MUST NOT:

- Move packages across layers without explicit instruction.
- Introduce hidden coupling between apps.

---

## Frontend Rules (React)

Agents MUST:

- Use named exports only (no `export default`).
- Use React Query for server state.
- Keep business logic out of UI components.
- Reuse components from shared.
- Follow existing form patterns (MUI + React Hook Form).
- Use centralized error handling.

Agents MUST NOT:

- Embed API calls directly inside presentational components.
- Duplicate constants or configuration values.

---

## Backend Rules (NestJS)

Agents MUST:

- Use DTOs with validation decorators.
- Follow existing module structure.
- Use centralized HttpClientService for outbound HTTP.
- Use defined RPC communication patterns between services.
- Maintain clear separation between controller, service, and infrastructure layers.

Agents MUST NOT:

- Introduce direct service-to-service HTTP calls unless explicitly defined.
- Modify transport configuration without instruction.
- Change existing message patterns without version consideration.

---

## API & Contract Safety

- All API changes must preserve backward compatibility unless versioned.
- Shared contracts must be updated atomically across services.
- Breaking changes require explicit approval.
- OpenAPI documentation must remain consistent with implementation.

---

## Infrastructure Awareness

Agents must consider:

- AKS resource limits.
- Containerized environment.
- Production Nginx usage for frontend.
- GitHub Actions CI requirements.

Agents MUST NOT:

- Modify Kubernetes YAML files unless explicitly requested.
- Change resource allocation strategy without approval.

---

## Security Constraints

Agents MUST:

- Avoid logging sensitive user data (PII).
- Validate file uploads and input payloads.
- Keep authentication boundaries intact.

Agents MUST NOT:

- Expose internal RPC endpoints publicly.
- Modify authentication strategy without instruction.

---

## Code Quality Requirements

- Follow ESLint and Prettier rules.
- English comments only.
- Keep modules cohesive and focused.
- No unused dependencies.
- No dead code.

---

## Git Workflow

- No direct push to main.
- All changes must pass CI.
- Follow conventional commit format when applicable.

---

## General Agent Behavior

Agents should:

- Prefer incremental changes over large refactors.
- Avoid speculative architectural redesign.
- Ask for clarification if boundary rules are unclear.
- Respect existing naming conventions.

Agents should not:

- Introduce new architectural patterns without instruction.
- Rewrite stable modules unnecessarily.
