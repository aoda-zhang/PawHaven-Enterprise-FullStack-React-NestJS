import { versionExtension } from './version.extension';
import { softDeleteExtension } from './soft-delete.extension';

export const defaultPrismaExtensions = [versionExtension, softDeleteExtension];
