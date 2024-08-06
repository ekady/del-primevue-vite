import { useAuthStore } from '../store/auth.store';
import { IAuthForm, IAuthLoginResponse } from '../model/auth.model';
import { reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { MESSAGE_ERROR_DEFAULT } from '@/core/constants/message.constant';
import { useI18n } from 'vue-i18n';
import http from '@/plugins/axios';
import { AUTH_API } from '../constants/authApi.constant';

export const useAuthLogin = () => {
  const auth_loading = ref(false);
  const auth_form = reactive<IAuthForm>({ username: '', password: '' });
  const auth_rules = { username: { required }, password: { required } };
  const auth_validation = useVuelidate(auth_rules, auth_form);
  const { t } = useI18n();


  const authStore = useAuthStore();

  const auth_doLogin = async (): Promise<IAuthLoginResponse> => {
    try {
      auth_loading.value = true;
      const { data } = await http.post<IAuthLoginResponse>(AUTH_API.LOGIN, auth_form);
      
      authStore.$patch({
        auth_isAuthenticated: true,
        auth_token: data.token,
        auth_userInfo: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(new Error(t(MESSAGE_ERROR_DEFAULT)));
    } finally {
      auth_loading.value = false;
    }
  };
  return {
    auth_loading,
    auth_doLogin,
    auth_form,
    auth_rules,
    auth_validation,
  };
};
