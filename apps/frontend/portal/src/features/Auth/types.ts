type UserInfoType = {
  userName: string;
  userID: string;
  globalMenuUpdateAt: string;
  globalRouterUpdateAt: string;
};
export type ProfileType = {
  accessToken: string;
  baseUserInfo: UserInfoType;
};
