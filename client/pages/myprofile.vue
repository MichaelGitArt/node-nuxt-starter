<template>
  <profile-layout :profile="user" personal>
    <transition name="fade-slide" mode="out-in" appear>
      <Nuxt />
    </transition>
  </profile-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileLayout from '@/components/Profile/ProfileLayout';

export default {
  name: 'MyProfile',
  components: {
    ProfileLayout,
  },
  middleware: 'auth',
  head() {
    return {
      title: this.$t('page.profile'),
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
