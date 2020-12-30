<template>
  <v-container class="fill-height container">
    <v-row class="fill-height pb-12" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12">
        <v-icon color="green" size="200">mdi-account-convert </v-icon>

        <div class="text-h6 mt-8">Завантаження користувача</div>
      </v-col>
      <v-col cols="8" sm="4">
        <v-progress-linear
          color="green accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AuthPageGoogle',
  middleware: 'un-auth',
  beforeCreate() {
    this.$store.dispatch('auth/fetchUser').then(() => {
      this.$router.push('/');
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 10%;
}
</style>
