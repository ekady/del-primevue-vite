<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthLogin } from '../composables/useAuth';

const { t } = useI18n();
const router = useRouter();
const { auth_doLogin, auth_loading, auth_validation, auth_form } = useAuthLogin();

async function onSubmit(): Promise<void> {
  auth_validation.value.$touch();
  if (auth_validation.value.$invalid)
    return;

  try {
    await auth_doLogin();
    router.replace({ name: 'dashboard' });
  } catch {
    //
  }
}

defineExpose({ onSubmit });
</script>

<template>
  <BaseLabel :title="t('auth.login')" underline size="20" />
  <Divider class="my-3" />
  <form @submit.prevent="onSubmit">
    <!-- Email -->
    <FormGroup v-slot="{ classes }" :label="t('auth.username')" no-gutter :validator="auth_validation.username">
      <BaseLabel :title="t('auth.username')" />
      <InputText v-model:model-value="auth_form.username" :disabled="auth_loading" :class="{ ...classes }" />
    </FormGroup>

    <!-- Password -->
    <FormGroup v-slot="{ classes }" :label="t('auth.password')" no-gutter :validator="auth_validation.password">
      <BaseLabel :title="t('auth.password')" />
      <InputText v-model:model-value="auth_form.password" :disabled="auth_loading" type="password" :class="{ ...classes }" />
    </FormGroup>
    <Button :label="t('common.submit')" :loading="auth_loading" type="submit" class="mt-4" />

    <div class="text-xs mt-4">
      <BaseLabel title="For more users, visit: " />
      <a href="https://dummyjson.com/users" target="blank"> this link </a>
    </div>
  </form>
</template>
