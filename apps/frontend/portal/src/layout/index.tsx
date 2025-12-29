import { useRouterInfo } from '@pawhaven/frontend-core';
import { NotificationBanner, Toast } from '@pawhaven/ui';
import { useTranslation } from 'react-i18next';
import type { NavigateFunction, UIMatch } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';

import { RootLayoutFooter } from './RootLayoutFooter';
import { RootLayoutMenu } from './RootLayoutMenu';

import { useAppBootstrapState } from '@/store/appBootstrapReducer';
import { useGlobalState } from '@/store/globalReducer';
import type { MenuItemType, RouterInfoType } from '@/types/LayoutType';

export interface LayoutProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches: Array<UIMatch<unknown, unknown>>;
}

export const RootLayout = () => {
  const { isSysMaintain } = useGlobalState();
  const { menus } = useAppBootstrapState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentRouterInfo = useRouterInfo<RouterInfoType>();
  const { isMenuAvailable = true, isFooterAvailable = true } =
    currentRouterInfo?.handle ?? {};

  return (
    <div className="flex flex-col box-border min-h-dvh">
      <header className="sticky top-0 bg-background z-notification">
        <Toast />
        {isSysMaintain && (
          <NotificationBanner
            banner={{
              id: 'system-maintenance',
              type: 'info',
              variant: 'filled',
              message: t('common.mockDataWarning'),
              dismissible: false,
            }}
          />
        )}
        {isMenuAvailable && menus?.length > 0 && (
          <RootLayoutMenu
            menuItems={menus}
            navigate={navigate}
            currentRouterInfo={currentRouterInfo}
          />
        )}
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        {isFooterAvailable && (
          <footer>
            <RootLayoutFooter />
          </footer>
        )}
      </main>
    </div>
  );
};
