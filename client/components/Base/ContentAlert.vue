<template>
  <transition name="fade" mode="out-in">
    <v-alert
      v-if="value"
      class="mt-3 body-2"
      colored-border
      :type="type"
      :icon="false"
      dense
      border="left"
      elevation="2"
    >
      <v-row align="center" no-gutters>
        <v-col class="grow">{{ value }}</v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn color="success" outlined @click="reset">OK</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </transition>
</template>

<script>
export default {
  props: {
    value: [String, null],
    type: {
      type: String,
      default: 'warning',
    },
    required: false,
  },
  methods: {
    reset() {
      this.$emit('input', '');
    },
  },
};
</script>
