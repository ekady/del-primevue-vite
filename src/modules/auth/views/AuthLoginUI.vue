<template>
  <BaseLabel :title="t('auth.login')" underline size="20" />
  <Divider class="my-3" />
  <form @submit.prevent="onSubmit">
    <!-- Email -->
    <FormGroup :label="t('auth.username')" noGutter :validator="auth_validation.username" v-slot="{ classes }">
      <BaseLabel :title="t('auth.username')" />
      <InputText :disabled="auth_loading" v-model:model-value="auth_form.username" :class="{ ...classes }" />
    </FormGroup>

    <!-- Password -->
    <FormGroup :label="t('auth.password')" noGutter :validator="auth_validation.password" v-slot="{ classes }">
      <BaseLabel :title="t('auth.password')" />
      <InputText :disabled="auth_loading" type="password" v-model:model-value="auth_form.password" :class="{ ...classes }" />
    </FormGroup>
    <Button :label="t('common.submit')" :loading="auth_loading" type="submit" class="mt-4" />

    <div class="text-xs mt-4">
      <BaseLabel title="For more users, visit: " />
      <a href="https://dummyjson.com/users" target="blank"> this link </a>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { useRouter } from 'vue-router';

import { useAuthLogin } from '../composables/useAuth';

const { t } = useI18n();
const router = useRouter();
const { auth_doLogin, auth_loading, auth_validation, auth_form } = useAuthLogin();

const onSubmit = async (): Promise<void> => {
  auth_validation.value.$touch();
  if (auth_validation.value.$invalid) return;

  try {
    await auth_doLogin();
    router.replace({ name: 'dashboard' });
  } catch (_) {
    //
  }
};

defineExpose({ onSubmit });
</script>
