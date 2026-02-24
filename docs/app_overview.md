# PawHaven Overview

## What is PawHaven?

PawHaven is an open-source animal rescue collaboration platform designed to support structured, transparent, and traceable rescue workflows.

The project aims to provide a digital infrastructure for:

- Volunteer coordination
- Case lifecycle management
- Shelter collaboration
- Adoption transparency
- Document generation and record retention

It models real-world rescue operations as structured workflows across multiple roles.

## Problem Statement

Animal rescue activities often rely on fragmented tools such as:

- Informal messaging groups
- Manual spreadsheets
- Paper-based documentation
- Ad-hoc coordination

These approaches create:

- Poor traceability
- Data fragmentation
- Lack of accountability
- Limited collaboration scalability

PawHaven addresses these issues by introducing:

- Clearly defined domain boundaries
- Role-based workflows
- Service-level data ownership
- Structured digital records

---

## Architectural Overview

![System Architecture](./images/sys_architecture.webp)

PawHaven follows a layered, service-oriented architecture:

### Client Layer

User interaction through web-based applications.

### Frontend Layer

Dedicated applications for different user roles.

### Gateway Layer

Centralized request routing and boundary control.

### Microservice Layer

Independently deployable services, each owning its domain logic and data.

### Data Isolation

Each microservice maintains its own database to enforce domain boundaries and prevent tight coupling.
