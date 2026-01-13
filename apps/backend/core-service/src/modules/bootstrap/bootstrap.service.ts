import { BadRequestException, Injectable } from '@nestjs/common';
import { databaseEngines, InjectPrisma } from '@pawhaven/backend-core';
import { PrismaClient as MongoPrismaClient } from '@prisma-mongo-client';

@Injectable()
export class BootstrapService {
  // logger: any;

  constructor(
    @InjectPrisma(databaseEngines.mongodb)
    private readonly prisma: MongoPrismaClient,
  ) {}

  /**
   * Create menus safely, each menu triggers prismaMiddleware
   * @param menus Array of menu objects
   */
  async createMenus(menu: any) {
    try {
      const menuCreated = this.prisma.menu.create({
        data: menu,
        select: {
          id: true,
          label: true,
          type: true,
          to: true,
          component: true,
          classNames: true,
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
    const routers = this.getAppRouters();
    return {
      menus,
      routers,
    };
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
        },
      });
      return menus;
    } catch (error) {
      console.error('error-------', error);
      throw new BadRequestException('get menus failed');
    }
  }

  getAppRouters() {
    return [
      {
        element: 'rootLayout',
        children: [
          {
            path: '/',
            handle: { isRequireUserLogin: false, isLazyLoad: false },
            element: 'home',
          },
          {
            path: '/report-stray',
            element: 'report_stray',
          },
          {
            path: '/rescue/guides',
            element: 'rescue_guides',
          },
          {
            path: '/rescue/detail/:animalID',
            element: 'rescue_detail',
          },
          {
            path: '/auth/login',
            handle: {
              isRequireUserLogin: false,
              isMenuAvailable: false,
              isLazyLoad: false,
            },
            element: 'auth_login',
          },
          {
            path: '/auth/register',
            handle: {
              isRequireUserLogin: false,
              isMenuAvailable: false,
              isLazyLoad: false,
            },
            element: 'auth_register',
          },
        ],
      },
      {
        path: '/notFund',
        element: 'notFund',
      },
    ];
  }
}
