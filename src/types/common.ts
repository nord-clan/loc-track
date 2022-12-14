import type { ThemeVarious } from '#/contexts/theme';
import type { IUserModel } from '#/store/user.store';

export interface IInitialData {
  theme: ThemeVarious;
  user: IUserModel;
}
