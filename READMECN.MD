[English](README.MD) | [中文](READMECN.MD)

# 🐾 PawHaven

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![pnpm](https://img.shields.io/badge/Package-pnpm-F69220?logo=pnpm&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

一个开源的动物救助平台，旨在通过数字化工具**连接志愿者、救助机构和领养者**，帮助他们高效地**上报、追踪并分享**动物救助案例。

[![image.png](https://i.postimg.cc/qqWcLRHN/image.png)](https://postimg.cc/y3XS67dK)

🌍 **在线地址：** [PawHaven](https://pawhaven.work)

---

## ✨ 项目亮点

- 基于**专业调研与业内从业者访谈**，围绕**真实的动物救助需求与业务流程**设计与构建

- 采用 **Monorepo 架构** 实现统一项目管理，集中管理前端、后端与共享代码，为**长期规划、多方协作与持续演进**提供基础

- 从项目设计之初即面向**多用户角色协作**，支持志愿者、救助机构与社区领养者共同参与，构建协同救助生态

- 前端在架构设计初期即采用**核心功能模块化**方案，使上报、追踪、故事分享等功能可独立维护与扩展

- 后端采用**微服务导向的模块化设计**，保障系统的可维护性与可扩展性

---

## 🧠 核心业务领域与功能

- **身份与信任体系** —— 用户认证、基于角色的权限控制，以及志愿者可信度机制
- **救助案例管理** —— 上报救助信息、跟踪进度、状态流转与操作指引
- **知识库与救助指南** —— 为志愿者与救助机构提供实用的救助指导
- **社区与故事分享** —— 分享救助成果，提升公众意识，连接潜在领养者

---

## 🧰 技术栈与工具链

- **前端：** React + Redux Toolkit + React Query + React Hook Form
- **后端：** NestJS + Prisma + MongoDB
- **共享包：** 可复用的 UI 组件、类型定义与通用工具方法等
- **基础设施：** 基于 pnpm + Turbo的 Monorepo 架构，GitHub Actions 实现 CI/CD

---

## 📚 目录导航

- [💻 应用概览](./docs/applicationAbout.md)
- ⚙️ Monorepo 架构与项目规范
- 🗄️ 仓库结构说明
- 🧱 共享包与 UI 组件库
- 📡 API 与后端架构
- 🗃️ 前端架构与状态管理
- ⚠️ 错误处理与监控

---

## 🚀 快速开始

如需在本地运行 PawHaven，请参考 **开发指南** 获取详细说明：

👉 [Development Guide](./docs/development.md)
