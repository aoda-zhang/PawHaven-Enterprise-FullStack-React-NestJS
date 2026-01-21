import { BadRequestException, Injectable } from '@nestjs/common';
import { databaseEngines, InjectPrisma } from '@pawhaven/backend-core';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';

@Injectable()
export class BootstrapService {
  constructor(
    @InjectPrisma(databaseEngines.mongodb)
    private readonly prisma: MongoPrismaClient,
  ) {}

  async createMenu(menu: any) {
    try {
      const menuCreated = await this.prisma.menu.create({
        data: menu,
        select: {
          id: true,
          label: true,
          type: true,
          to: true,
          component: true,
          classNames: true,
          order: true,
        },
      });
      return menuCreated;
    } catch (error) {
      console.error('error-------', error);
      throw new BadRequestException(`add menu :${menu?.label} failed`);
    }
  }

  async getAppMenus() {
    try {
      const menus = await this.prisma.menu.findMany({
        select: {
          id: false,
          label: true,
          type: true,
          to: true,
          component: true,
          classNames: true,
          order: true,
        },
        orderBy: { order: 'asc' },
      });
      return menus;
    } catch (error) {
      console.error('error-------', error);
      throw new BadRequestException('get menus failed');
    }
  }

  async createRouter(menu: any) {
    try {
      const menuCreated = this.prisma.route.create({
        data: menu,
        select: {
          id: true,
          path: true,
          element: true,
          handle: true,
        },
      });
      return menuCreated;
    } catch (error) {
      console.error('error-------', error);
      throw new BadRequestException(`add menu :${menu?.label} failed`);
    }
  }

  async getAppBootstrap() {
    const menus = await this.getAppMenus();
    const routers = await this.getAppRouters();
    return {
      menus,
      routers,
    };
  }

  async getAppRouters(): Promise<any[]> {
    const routes = await this.prisma.route.findMany({
      select: {
        id: true,
        path: true,
        element: true,
        handle: true,
        parentId: true,
      },
      orderBy: { order: 'asc' },
    });

    const root = routes.find((r) => r.parentId === null);
    if (!root) return [];

    const children = routes
      .filter((r) => r.parentId === root.id)
      .map((r) => ({
        path: r.path,
        element: r.element,
        ...(r.handle ? { handle: r.handle } : {}),
      }));

    return [
      {
        element: root.element,
        ...(children.length > 0 ? { children } : {}),
      },
    ];
  }
}
