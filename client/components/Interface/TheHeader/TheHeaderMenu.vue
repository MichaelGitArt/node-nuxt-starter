<template>
  <div class="d-flex">
    <v-divider
      v-if="$vuetify.breakpoint.mdAndUp"
      class="mx-2"
      vertical
    ></v-divider>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      left
    >
      <template #activator="{ on }">
        <div class="cursor-pointer" v-on="on">
          <v-list-item-avatar class="mr-0 elevation-3">
            {{ user.name[0] }}
          </v-list-item-avatar>
        </div>
      </template>

      <v-card>
        <v-list>
          <v-list-item class="pb-1">
            <v-list-item-avatar class="elevation-3">
              {{ user.name[0] }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item color="green" to="/myprofile" @click="menu = false">
            {{ $t('base.profile') }}
          </v-list-item>

          <v-list-item class="red" dense dark link @click="logout">
            {{ $tc('base.signOut', 2) }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    user: {
      type: Object,
      requried: true,
    },
  },
  data: () => ({
    menu: false,
  }),
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
};
</script>
