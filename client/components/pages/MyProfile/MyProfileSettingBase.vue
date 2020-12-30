<template>
  <validation-observer ref="observer" v-slot="{ touched }">
    <v-form @submit.prevent="submit">
      <settings-section :title="$t('title')">
        <validation-provider
          v-slot="{ errors }"
          ref="name"
          rules="required|min:1|max:30"
          :name="$t('forms.name')"
        >
          <v-text-field
            v-model="formData.name"
            color="green"
            counter="30"
            :label="$t('forms.name')"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          ref="nickname"
          rules="required|min:5|max:20"
          :name="$t('forms.nickname')"
        >
          <v-text-field
            v-model.trim="formData.nickname"
            counter="20"
            color="green"
            :label="$t('forms.nickname')"
            :loading="nicknameLoading"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>

        <div class="d-flex flex-wrap justify-end mb-n3 mt-4">
          <v-btn v-if="touched" class="mb-3" color="error" to="/myprofile">
            {{ $t('base.dismiss') }}
          </v-btn>
          <v-btn
            type="submit"
            class="ml-3 mb-3"
            color="success"
            :loading="loading"
          >
            {{ $t('base.save') }}
          </v-btn>
        </div>
      </settings-section>
    </v-form>
  </validation-observer>
</template>

<script>
import axios from 'axios';
import debounce from 'debounce';
import { mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import SettingsSection from '@/components/Base/SettingsSection';

// api
import profileApi from '~/api/profileApi';

// helper
import parseValidation from '~/helper/parseValidation.js';

// import Vue from 'vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    SettingsSection,
    // AvatarUpload,
  },
  data: () => ({
    formData: {
      name: '',
      nickname: '',
    },
    nicknameLoading: false,
    loading: false,
  }),
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    'formData.nickname'() {
      this.checkNickname();
    },
  },
  created() {
    this.formData.name = this.user.name;
    this.formData.nickname = this.user.nickname;

    this.checkNickname = debounce(this.checkNickname, 1000);
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;
      this.loading = true;
      profileApi
        .updateProfile(this.formData)
        .then(({ data, status }) => {
          if (!data.success) {
            throw data.error;
          }
          if (data.isInvalid) {
            return this.setValidationErrors(data.validationErrors);
          }

          return this.$store.dispatch('auth/setUser', data.user);
        })
        .catch((err) => {
          this.$store.dispatch('handleError', err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setValidationErrors(validationErrors) {
      const errors = parseValidation(validationErrors, this.$tc.bind(this));

      Object.keys(errors).forEach((field) => {
        this.$refs[field].setErrors(errors[field]);
      });
    },
    checkNickname() {
      this.$refs.observer.validate().then((valid) => {
        if (!valid) return;

        this.nicknameLoading = true;

        if (this.source) {
          this.source.cancel('');
        }
        this.source = axios.CancelToken.source();

        profileApi
          .checkFreeNickname({ nickname: this.formData.nickname }, this.source)
          .then(({ data }) => {
            if (!data.success) {
              throw data.error;
            }
            if (data.isInvalid) {
              return this.setValidationErrors(data.validationErrors);
            }
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              this.$store.dispatch('handleError', err);
            }
          })
          .finally(() => {
            this.nicknameLoading = false;
          });
      });
    },
  },

  i18n: {
    messages: {
      ru: {
        title: 'Общие настройки',
        errors: {
          validation: {
            NOT_UNIQUE: '{field} уже занят. Попробуйте другой',
            UNSUPPORTED_SYMBOLS:
              'Можно использовать только буквы, цифры, тире и точки',
          },
        },
      },
      uk: {
        title: 'Загальні налаштування',
        errors: {
          validation: {
            NOT_UNIQUE: '{field} вже зайнятий. Введіть інший',
            UNSUPPORTED_SYMBOLS:
              'Можна використовувати тільки букви, цифри, тире та крапки',
          },
        },
      },
    },
  },
};
</script>
