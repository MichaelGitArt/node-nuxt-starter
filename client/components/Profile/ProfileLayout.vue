<template>
  <v-container>
    <v-card class="profile-main elevation-5">
      <profile-header :profile="profile" :settings-icon="personal">
        <slot name="header"></slot>
      </profile-header>
      <div v-if="$slots.default" class="px-4">
        <v-divider class="mb-3"></v-divider>
        <slot></slot>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import ProfileHeader from '@/components/Profile/ProfileHeader';

export default {
  components: {
    ProfileHeader,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    personal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.profile-main {
  margin-top: 50px;
}
@media #{map-get($display-breakpoints, 'md-and-down')} {
  .profile-main {
    margin-top: 40px;
  }
}
</style>
