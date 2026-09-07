import type { RouterHandle } from '@pawhaven/shared/types';

export type {
  MenuItem as MenuItemType,
  RouterItem as RouterEle,
  RouterHandle,
} from '@pawhaven/shared/types';

export interface RouterInfoType {
  data: Record<string, unknown> | undefined;
  handle?: RouterHandle;
  id: string;
  params: Record<string, unknown> | undefined;
  pathname: string;
}
