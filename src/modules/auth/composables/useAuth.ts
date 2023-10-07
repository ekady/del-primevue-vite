import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth.store';
import { IAuthForm } from '../model/auth.model';

const useAuth = () => {
  const store = useAuthStore();
  const { auth_loading, auth_isAuthenticated, auth_token, auth_userInfo } = storeToRefs(store);

  const auth_doLogin = async (form: IAuthForm, callback?: () => void) => {
    try {
      const data = await store.auth_doLogin(form);
      if (data) callback?.();

      return data;
    } catch (_) {
      //
    }
  };
  return {
    auth_loading,
    auth_isAuthenticated,
    auth_token,
    auth_userInfo,

    auth_doLogin,
  };
};

export default useAuth;
