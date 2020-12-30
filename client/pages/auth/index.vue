<template>
  <v-container>
    <v-row class="pt-4" justify="center">
      <v-col cols="10" class="d-flex flex-column align-center">
        <h2 class="mb-3 text-center">Оберіть варіант входу</h2>

        <div class="buttons">
          <auth-google-button class="mb-4" />

          <client-only>
            <auth-telegram-button />
          </client-only>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthGoogleButton from '@/components/Auth/AuthGoogleButton.vue';
import AuthTelegramButton from '@/components/Auth/AuthTelegramButton.vue';

export default {
  name: 'AuthPage',
  components: {
    AuthGoogleButton,
    AuthTelegramButton,
  },
  middleware: 'un-auth',
};
</script>

<style lang="scss" scoped>
.buttons {
  width: 100%;
  max-width: 300px;
}
</style>
