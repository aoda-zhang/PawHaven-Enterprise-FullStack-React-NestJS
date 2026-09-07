export interface RouterHandle {
  isMenuAvailable?: boolean;
  isFooterAvailable?: boolean;
  isLazyLoad?: boolean;
  isRequireUserLogin?: boolean;
}

export interface RouterItem {
  element: string;
  path: string | null;
  children?: RouterItem[];
  handle: RouterHandle;
}
