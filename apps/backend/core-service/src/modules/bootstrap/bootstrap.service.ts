import { BadRequestException, Injectable } from '@nestjs/common';
import { databaseEngines, InjectPrisma } from '@pawhaven/backend-core';
import { PrismaClient as MongoPrismaClient } from '@prisma-mongo-client';

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
          id: true,
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

  // getAppRouters() {
  //   return [
  //     {
  //       element: 'rootLayout',
  //       children: [
  //         {
  //           path: '/',
  //           handle: { isRequireUserLogin: false, isLazyLoad: false },
  //           element: 'home',
  //         },
  //         {
  //           path: '/report-stray',
  //           element: 'report_stray',
  //         },
  //         {
  //           path: '/rescue/guides',
  //           element: 'rescue_guides',
  //         },
  //         {
  //           path: '/rescue/detail/:animalID',
  //           element: 'rescue_detail',
  //         },
  //         {
  //           path: '/auth/login',
  //           handle: {
  //             isRequireUserLogin: false,
  //             isMenuAvailable: false,
  //             isLazyLoad: false,
  //           },
  //           element: 'auth_login',
  //         },
  //         {
  //           path: '/auth/register',
  //           handle: {
  //             isRequireUserLogin: false,
  //             isMenuAvailable: false,
  //             isLazyLoad: false,
  //           },
  //           element: 'auth_register',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/notFund',
  //       element: 'notFund',
  //     },
  //   ];
  // }

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
