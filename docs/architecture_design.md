# Architectural Design

![System Architecture](./images/sys_architecture.webp)

PawHaven adopts a **layered, gateway-centered microservice architecture**.

The system is structured into a modular frontend layer, a centralized API Gateway, and independently deployable backend microservices.  
Each service owns its domain logic and database, ensuring strict boundary control and domain isolation.

This architecture emphasizes separation of concerns and independent evolution of system components.

---

## What Is My Architecture?

PawHaven is designed as:

- A **modular frontend** built with React and TypeScript
- A **centralized API Gateway** responsible for routing and authentication
- Multiple **domain-oriented microservices**
- A **database-per-service isolation model**
- A strictly controlled `shared` layer containing only types, constants, and pure utilities

The frontend does not directly communicate with microservices.  
All requests are mediated through the Gateway, which enforces security and request orchestration.

Each backend service focuses on a single domain (e.g., rescue management, adoption workflow, notification handling).

---

## Why Did I Design It This Way?

Stray animal rescue workflows involve multiple independent domains:

- Rescue case lifecycle management
- Adoption processes
- User management
- Notification and communication

If implemented as a monolithic backend, these concerns would become tightly coupled and harder to evolve.

Therefore, this architecture was chosen to:

- Isolate business domains clearly
- Prevent cross-service coupling
- Centralize authentication and routing
- Allow independent service deployment
- Simulate real-world production architecture rather than a simple CRUD application

---

## What Are the Benefits of This Design?

This architecture provides:

- **Scalability** — Services can scale independently
- **Maintainability** — Clear boundaries reduce unintended side effects
- **Extensibility** — New domains can be added without refactoring the entire system
- **Fault Isolation** — Failures in one service do not cascade system-wide
- **Production Realism** — Reflects enterprise-level full-stack architectural patterns

PawHaven is not structured only for feature delivery, but for long-term architectural clarity and system evolution.
