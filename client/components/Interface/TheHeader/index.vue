<template>
  <v-app-bar class="app-bar" app dark color="green">
    <v-container d-flex align-center pa-0 px-md-3>
      <v-app-bar-nav-icon v-if="user" @click="toggleDrawer" />
      <router-link tag="div" to="/">
        <v-toolbar-title>
          <span class="font-weight-bold">Gitart</span> Starter
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <the-header-menu v-if="user" :user="user" />
      <v-btn v-else color="warning" to="/auth">
        {{ $tc('base.signIn', 2) }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TheHeaderMenu from './TheHeaderMenu';

export default {
  components: {
    TheHeaderMenu,
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'interface/toggleDrawer',
    }),
  },
};
</script>
