<template>
  <div class="wrap"></div>
</template>
<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.async = true;

    // Size
    script.setAttribute('data-size', 'large');

    // Button picture
    script.setAttribute('data-userpic', true);

    // Bot name
    script.setAttribute(
      'data-telegram-login',
      process.env.TELEGRAM_BOT_NICKNAME
    );

    script.setAttribute('data-request-access', true);
    script.setAttribute('data-radius', 4);

    script.setAttribute(
      'data-auth-url',
      process.env.SERVER_URL + process.env.TELEGRAM_AUTH_PATH
    );

    script.src = 'https://telegram.org/js/telegram-widget.js';
    this.$el.appendChild(script);
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
}
</style>
