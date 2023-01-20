export type IAuthUserInfo = {
  id: number | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
};

export type IAuthStore = {
  auth_isAuthenticated: boolean;
  auth_token: string | null;
  auth_userInfo: IAuthUserInfo | null;
  auth_loading: boolean;
};

export type IAuthForm = {
  username: string | null;
  password: string | null;
};

export type IAuthLoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
