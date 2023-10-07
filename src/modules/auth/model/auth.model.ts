export interface IAuthUserInfo {
  id: number | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
}

export interface IAuthStore {
  auth_isAuthenticated: boolean;
  auth_token: string | null;
  auth_userInfo: IAuthUserInfo | null;
  auth_loading: boolean;
}

export interface IAuthForm {
  username: string | null;
  password: string | null;
}

export interface IAuthLoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
