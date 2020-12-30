<template>
  <v-app dark>
    <the-header />
    <the-drawer v-if="user" :user="user" />

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import TheHeader from '@/components/Interface/TheHeader';
import TheDrawer from '@/components/Interface/TheDrawer';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheDrawer,
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
