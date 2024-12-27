<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/modules/auth/store/auth.store';

const authStore = useAuthStore();
const { auth_isAuthenticated } = storeToRefs(authStore);
const router = useRouter();

// If authenticated redirect to dashboard
router.replace({
  name: auth_isAuthenticated.value ? 'dashboard' : 'login',
});
</script>

<template>
  <!-- Adjust entry point to your needs, for this sample only use for redirect to dashboard or login if user access "/" -->
  <p>If you can see me, your network is slow :D.</p>
</template>
