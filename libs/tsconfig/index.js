/**
 * Export TSConfig files for monorepo apps.
 * Allows each project to extend the appropriate config:
 * - base: common rules for all TS projects
 * - web: frontend projects
 * - node: backend Node/NestJS projects
 */
export { default as base } from './base.json';
export { default as web } from './web.json';
export { default as node } from './node.json';
