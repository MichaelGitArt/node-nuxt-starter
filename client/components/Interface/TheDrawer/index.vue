<template>
  <v-navigation-drawer v-model="drawer" temporary app dark color="green">
    <v-list-item v-if="user" two-line class="white--text">
      <v-list-item-avatar class="my-2 elevation-2">
        {{ user.name[0] }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Gitart Planner</v-list-item-title>
        <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <template #append>
      <lang-switcher />
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import LangSwitcher from '@/components/Interface/General/LangSwitcher';

export default {
  components: {
    LangSwitcher,
  },
  props: {
    user: {
      type: Object,
      requried: true,
    },
  },
  computed: {
    ...mapState('interface', {
      drawerState: 'drawer',
    }),
    drawer: {
      get() {
        return this.drawerState;
      },
      set(value) {
        this.$store.dispatch('interface/setDrawer', value);
      },
    },
  },
};
</script>
