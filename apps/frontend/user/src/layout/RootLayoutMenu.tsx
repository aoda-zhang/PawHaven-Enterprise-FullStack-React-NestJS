import { useMatchBreakpoint } from '@pawhaven/design-system/useMatchBreakpoint';
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';

import { RootLayoutMenuRender } from './RootLayoutMenuRender';
import { RootLayoutSidebar } from './RootLayoutSidebar';

import Brand from '@/components/Brand';
import type { RootLayoutHeaderProps } from '@/types/LayoutType';

export const RootLayoutMenu = ({
  menuItems,
  navigate,
  currentRouterInfo,
}: RootLayoutHeaderProps) => {
  const isMDDevice = useMatchBreakpoint('md');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const onOpenSidebar = () => setSidebarOpen(true);
  const onCloseSidebar = () => setSidebarOpen(false);

  return (
    <header className="flex items-center gap-4 box-border p-[.625rem] z-header border-border border-b-1 px-6 py-4 bg-white">
      <Brand navigate={navigate} />
      {!isMDDevice && (
        <RootLayoutMenuRender
          menuItems={menuItems}
          activePath={currentRouterInfo?.pathname || ''}
          navigate={navigate}
        />
      )}

      {/* Open Side bar Icon */}
      {isMDDevice && <AlignJustify size={34} onClick={onOpenSidebar} />}
      {/* Side bar */}
      <RootLayoutSidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={onCloseSidebar}
        navigate={navigate}
      />
    </header>
  );
};
