type UserInfoType = {
  userName: string;
  userID: string;
  globalMenuUpdateAt: string;
  globalRouterUpdateAt: string;
};

export type AuthFieldType = {
  userName: string;
  password: string;
  phoneNumber?: string;
};
export type ProfileType = {
  accessToken: string;
  baseUserInfo: UserInfoType;
};
