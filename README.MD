[English](README.MD) | [中文](READMECN.MD)
# 🐾 PawHaven
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![pnpm](https://img.shields.io/badge/Package-pnpm-F69220?logo=pnpm&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)


An open-source animal rescue platform that **empowers volunteers, shelters, and adopters** with digital tools to report, track, and share animal rescue cases.

[![image.png](https://i.postimg.cc/qqWcLRHN/image.png)](https://postimg.cc/y3XS67dK)

🌍 **Live:** [PawHaven](https://pawhaven.work)

---

## ✨ Highlights

- Built around **real animal rescue workflows**, not generic CRUD

- **Monorepo setup** that keeps frontend, backend, and shared code in one place, helping the team work with consistent rules and making the project easier to maintain and grow over time

- Supports multiple **user roles**: volunteers, shelters, and community adopters

- **Feature-driven frontend** with domain-aligned modules for reporting, tracking, and story sharing

- **Backend modules** mirror business domains to ensure maintainable, scalable services

- Comprehensive **documentation-first approach** to support contributors and future growth

---

## 🧠 Core Domains & Features

- **Identity & Trust** – user authentication, role-based access, and volunteer credibility  
- **Rescue Case Management** – report rescues, track progress, assign status, and handle guides  
- **Knowledge & Rescue Guides** – practical guidance for volunteers and shelters  
- **Community & Stories** – share rescue outcomes, raise awareness, and engage adopters

---

## 🧰 Tech Stack & Tooling

- **Frontend:** React + Redux Toolkit (global state) + React Query (server state) + React Hook Form  
- **Backend:** NestJS + Prisma + MongoDB  
- **Shared Packages:** reusable UI components, types, and utilities  
- **Infrastructure:** Monorepo with pnpm, GitHub Actions CI/CD 

---

## 📚 Table of Contents

- [💻 Application Overview](./docs/applicationAbout.md)
- ⚙️ Monorepo & Project Standards
- 🗄️ Repository Structure
- 🧱 Shared Packages & UI Library
- 📡 API & Backend Architecture
- 🗃️ Frontend Architecture & State Management
- ⚠️ Error Handling & Monitoring

---

## 🚀 Getting Started

To run PawHaven locally, please refer to the **Development Guide** for detailed instructions:

👉 [Development Guide](./docs/development.md)
