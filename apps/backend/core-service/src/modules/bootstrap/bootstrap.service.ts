import { BadRequestException, Injectable } from '@nestjs/common';
import { databaseEngines, InjectPrisma } from '@pawhaven/backend-core';
import { MenuItem, Menu } from '@pawhaven/shared/types/menus.schema';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';

@Injectable()
export class BootstrapService {
  constructor(
    @InjectPrisma(databaseEngines.mongodb)
    private readonly prisma: MongoPrismaClient,
  ) {}

  async addMenuItem(menu: MenuItem): Promise<MenuItem> {
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

  async getAppMenus(): Promise<Menu> {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          status: 'active',
        },
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

  async addAppRouter(menu: any) {
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
        order: true,
        status: true,
      },
      orderBy: { order: 'asc' },
    });

    const activeRoutes = routes.filter((route) => route.status === 'active');

    const routeMap = new Map<string, any>();

    activeRoutes.forEach((r) => {
      routeMap.set(r.id, {
        path: r.path ?? undefined,
        element: r.element,
        ...(r.handle ? { handle: r.handle } : {}),
      });
    });

    const result: any[] = [];

    activeRoutes.forEach((r) => {
      const current = routeMap.get(r.id);

      if (r.parentId) {
        const parent = routeMap.get(r.parentId);
        if (!parent) return;

        parent.children = parent.children
          ? [...parent.children, current]
          : [current];
      } else {
        result.push(current);
      }
    });

    return result;
  }
}
