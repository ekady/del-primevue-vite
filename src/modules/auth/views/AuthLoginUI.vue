<template>
  <BaseLabel :title="t('auth.login')" underline size="20" />
  <Divider class="my-3" />
  <form @submit.prevent="onSubmit">
    <!-- Email -->
    <FormGroup :label="t('auth.username')" noGutter :validator="v$.username" v-slot="{ classes }">
      <BaseLabel :title="t('auth.username')" />
      <InputText :disabled="auth_loading" v-model:model-value="form.username" :class="{ ...classes }" />
    </FormGroup>

    <!-- Password -->
    <FormGroup :label="t('auth.password')" noGutter :validator="v$.password" v-slot="{ classes }">
      <BaseLabel :title="t('auth.password')" />
      <InputText :disabled="auth_loading" type="password" v-model:model-value="form.password" :class="{ ...classes }" />
    </FormGroup>
    <Button :label="t('common.submit')" :loading="auth_loading" type="submit" class="mt-4" />

    <div class="text-xs mt-4">
      <BaseLabel title="For more users, visit: " />
      <a href="https://dummyjson.com/users" target="blank"> this link </a>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

import { useI18n } from 'vue-i18n';

import { useRouter } from 'vue-router';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { IAuthForm } from '../model/auth.model';
import useAuth from '../composables/useAuth';

const form = reactive<IAuthForm>({ username: '', password: '' });
const rules = {
  username: { required },
  password: { required },
};

const { t } = useI18n();
const v$ = useVuelidate(rules, form);
const router = useRouter();
const { auth_doLogin, auth_loading } = useAuth();

const redirectToDashboard = () => {
  router.replace({ name: 'dashboard' });
};

const onSubmit = async (): Promise<void> => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    await auth_doLogin(form, redirectToDashboard);
  } catch (_) {
    //
  }
};

defineExpose({ onSubmit, redirectToDashboard });
</script>
