import { I18nSwitch } from '@pawhaven/frontend-core/components';
import clsx from 'clsx';
import { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  menuTypes,
  type MenuItemType,
  type MenuRenderType,
} from '@/types/LayoutType';

const HeaderActionKeys = {
  openSidebarMenu: 'openSidebarMenu',
  toggleDark: 'toggleDark',
};

const rootLayoutClassNames = {
  menuItem:
    'cursor-pointer flex justify-center items-center p-sm border-b border-border md:border-none hover:text-primary',
  activeMenuItem: 'block text-primary',
  login:
    'px-3 py-2 rounded-sm bg-primary text-white m-4 lg:m-0 flex justify-center items-center cursor-pointer',
};
export const RootLayoutMenuRender = (props: MenuRenderType) => {
  const HeaderComponentMappings = {
    I18nSwitch: <I18nSwitch />,
  };
  const { menuItems, activePath, navigate } = props;
  const { t } = useTranslation();

  const toggleDark = (theme: string) => {
    return `props_${theme}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleHeaderAction = (action: string, actionProps: any) => {
    switch (action) {
      case HeaderActionKeys.toggleDark:
        toggleDark(actionProps);
        break;
      // Add more cases for different actions as needed
      default:
        console.warn(`Unknown header action: ${action}`);
    }
  };

  const handleLinkMenu = (item: MenuItemType) => {
    if (item?.to) {
      const isActiveMenuItem =
        item.type === menuTypes.link && activePath === item?.to;
      let itemClassNames = [
        rootLayoutClassNames[
          item?.classNames as unknown as keyof typeof rootLayoutClassNames
        ] ?? '',
      ];
      if (isActiveMenuItem) {
        // Active the current menu
        itemClassNames = [
          ...itemClassNames,
          rootLayoutClassNames.activeMenuItem,
        ];
      }
      return (
        <div
          className={clsx(itemClassNames)}
          key={item.label}
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate(item.to || '/');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate(item.to || '/');
            }
          }}
        >
          {t(item.label)}
        </div>
      );
    }
    return null;
  };

  const handleComponentMenu = (item: MenuItemType) => {
    if (item?.component) {
      const itemClassNames = item?.classNames ?? [];
      const Component =
        HeaderComponentMappings[
          item.component as unknown as keyof typeof HeaderComponentMappings
        ];
      return (
        <div
          className={clsx(itemClassNames)}
          key={item?.label}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!item.action) return;
            handleHeaderAction(item.action, item?.props ?? {});
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!item.action) return;
              handleHeaderAction(item.action, item?.props ?? {});
            }
          }}
        >
          {Component && cloneElement(Component, item.props ?? {})}
        </div>
      );
    }
    return null;
  };

  return menuItems?.map((item) => {
    switch (item.type) {
      case menuTypes.link:
        return handleLinkMenu(item);
      case menuTypes.component:
        return handleComponentMenu(item);
      default:
        return null;
    }
  });
};
