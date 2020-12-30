<template>
  <div>
    <v-list-item-group v-model="currentLang" mandatory color="white">
      <v-list-item
        v-for="lang in languages"
        :key="lang.code"
        dense
        @click="setLang(lang)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="lang.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <!-- <div class="lang-switcher">
      <span
        v-for="lang in languages"
        :class="{ 'lang-switcher__item--active': lang.code === $i18n.locale }"
        class="lang-switcher__item"
      >
        {{ lang.name }}
      </span>
    </div> -->
  </div>
</template>

<script>
import { localize } from 'vee-validate';
import uk from 'vee-validate/dist/locale/uk.json';
import ru from 'vee-validate/dist/locale/ru.json';

export default {
  data: () => ({
    currentLang: null,
    languages: [
      {
        name: 'Укр',
        code: 'uk',
      },
      {
        name: 'Рус',
        code: 'ru',
      },
    ],
  }),
  created() {
    // vee-validate setup
    localize({
      uk,
      ru,
    });
    localize(this.$i18n.locale);

    this.languages.forEach((lang, index) => {
      if (lang.code === this.$i18n.locale) {
        this.currentLang = index;
      }
    });
  },
  methods: {
    setLang(lang) {
      this.$i18n.setLocale(lang.code);
      localize(lang.code);
    },
  },
};
</script>

<style scoped lang="scss">
.lang-switcher {
  display: flex;
  &__item {
    cursor: pointer;
    line-height: 1;
    padding: 4px 5px 2px;
    transition: all 0.2s;
    opacity: 0.7;
    border: 1px solid rgba(255, 255, 255, 0.7);
    margin-right: 8px;
    &--active {
      opacity: 1;
      font-weight: 700;
    }
    &:hover {
      opacity: 1;
    }
  }
}
// @include sm {
//   .lang-switcher {
//     &__item {
//       padding: 6px 13px 4px;
//     }
//   }
// }
</style>
