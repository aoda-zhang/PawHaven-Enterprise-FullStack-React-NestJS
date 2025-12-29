import { Injectable } from '@nestjs/common';

@Injectable()
export class BootstrapService {
  async getAppBootstrap() {
    const menus = this.getAppMenus();
    const routers = this.getAppRouters();
    return {
      menus,
      routers,
    };
  }

  getAppMenus() {
    return [
      {
        label: 'common.record',
        to: '/report-stray',
        classNames: ['menuItem'],
        type: 'link',
      },
      {
        label: 'common.stories',
        to: '/rescue/story',
        classNames: ['menuItem'],
        type: 'link',
      },
      {
        label: 'common.guides',
        to: '/rescue/guides',
        classNames: ['menuItem'],
        type: 'link',
      },
      {
        label: 'auth.auth',
        to: '/auth/login',
        classNames: ['login'],
        type: 'link',
      },
      {
        label: 'common.language',
        component: 'I18nSwitch',
        type: 'component',
      },
    ];
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
