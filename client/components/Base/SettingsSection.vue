<template>
  <v-row>
    <v-col v-if="title" cols="12" lg="3" md="4">
      <div class="text-h6">{{ title }}</div>
    </v-col>
    <v-col :class="{ 'offset-lg-3 offset-md-4': !title }">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>
