<template>
  <AppBaseLabel :title="t('auth.login')" underline size="20" />
  <Divider class="my-3" />
  <form @submit.prevent="onSubmit">
    <!-- Email -->
    <FormGroup :label="t('auth.username')" noGutter :validator="v$.username" v-slot="{ classes }">
      <AppBaseLabel :title="t('auth.username')" />
      <InputText :disabled="auth_loading" v-model:model-value="form.username" :class="{ ...classes }" />
    </FormGroup>

    <!-- Password -->
    <FormGroup :label="t('auth.password')" noGutter :validator="v$.password" v-slot="{ classes }">
      <AppBaseLabel :title="t('auth.password')" />
      <InputText :disabled="auth_loading" type="password" v-model:model-value="form.password" :class="{ ...classes }" />
    </FormGroup>
    <Button :label="t('common.submit')" :loading="auth_loading" type="submit" class="mt-4" />

    <div class="text-xs mt-4">
      <AppBaseLabel title="For more users, visit: " />
      <a href="https://dummyjson.com/users" target="blank"> this link </a>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

import { useI18n } from 'vue-i18n';

import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { IAuthForm } from '../model/auth.model';
import { useAuthStore } from '../store/auth.store';

const form = reactive<IAuthForm>({ username: '', password: '' });
const rules = {
  username: { required },
  password: { required },
};

const { t } = useI18n();
const v$ = useVuelidate(rules, form);
const router = useRouter();
const store = useAuthStore();
const { auth_loading } = storeToRefs(store);

const redirectToTodos = () => {
  router.replace({ name: 'todos' });
};

const onSubmit = async (): Promise<void> => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    const data = await store.auth_doLogin(form);
    if (data) redirectToTodos();
  } catch (_) {
    //
  }
};
</script>
