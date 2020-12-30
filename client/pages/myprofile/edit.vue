<template>
  <div>
    <div class="d-flex flex-wrap">
      <v-btn icon class="mr-3" color="warning" to="/myprofile">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>

      <h2>{{ $t('title') }}</h2>
    </div>

    <my-profile-setting-base />

    <settings-section>
      Others settings
      <!-- <avatar-upload /> -->
    </settings-section>
  </div>
</template>

<script>
import MyProfileSettingBase from '@/components/pages/MyProfile/MyProfileSettingBase';
import SettingsSection from '@/components/Base/SettingsSection';
// import AvatarUpload from '@/components/Profile/AvatarUpload';

export default {
  name: 'MyProfileEdit',
  components: {
    SettingsSection,
    MyProfileSettingBase,
    // AvatarUpload,
  },

  i18n: {
    messages: {
      ru: {
        title: 'Редактирование',
      },
      uk: {
        title: 'Редагування',
      },
    },
  },
};
</script>
