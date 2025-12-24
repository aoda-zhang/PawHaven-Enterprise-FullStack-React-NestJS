import { useRouterInfo } from '@pawhaven/frontend-core';
import { NotificationBanner, Toast } from '@pawhaven/ui';
import { useTranslation } from 'react-i18next';
import type { NavigateFunction, UIMatch } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';

import { useFetchGlobalMenu } from './RootLayoutAPI';
import { RootLayoutFooter } from './RootLayoutFooter';
import { RootLayoutMenu } from './RootLayoutMenu';

import { useGlobalState } from '@/store/globalReducer';
import type { MenuItemType, RouterInfoType } from '@/types/LayoutType';

export interface LayoutProps {
  menuItems: MenuItemType[];
  navigate: NavigateFunction;
  routerMatches: Array<UIMatch<unknown, unknown>>;
}

export const RootLayout = () => {
  const { profile, isSysMaintain } = useGlobalState();
  const { data: globalMenuItems = [] } = useFetchGlobalMenu(
    profile?.baseUserInfo?.userID,
    profile?.baseUserInfo?.globalMenuUpdateAt,
  );
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
        {isMenuAvailable && globalMenuItems?.length > 0 && (
          <RootLayoutMenu
            menuItems={globalMenuItems}
            navigate={navigate}
            currentRouterInfo={currentRouterInfo}
          />
        )}
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <footer>{isFooterAvailable && <RootLayoutFooter />}</footer>
      </main>
    </div>
  );
};
