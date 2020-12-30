<template>
  <div>
    <v-flex class="text-caption">Аватар</v-flex>
    <v-flex class="d-flex align-center flex-sm-row">
      <v-avatar>
        <img :src="user.avatar" alt="John" />
      </v-avatar>
      <v-flex class="pl-4 d-flex flex-column">
        <v-file-input
          ref="input"
          v-model="imgFile"
          prepend-icon="mdi-camera"
          :clearable="false"
          accept="image/*"
          label="Змінити фото"
          @change="handleImage"
        ></v-file-input>
      </v-flex>
    </v-flex>
    <v-dialog v-model="uploadModal" persistent width="500">
      <v-card class="px-4">
        <v-row align="center">
          <v-col cols="8">
            <clipper-basic
              ref="clipper"
              preview="avatar-crop"
              :init-width="100"
              :init-height="100"
              :src="fileUrl"
              :ratio="1"
            ></clipper-basic>
          </v-col>
          <v-col cols="4">
            <div class="modal-preview">
              <clipper-preview name="avatar-crop" class="my-clipper">
                <div slot="placeholder" class="placeholder">preview area</div>
              </clipper-preview>
            </div>
          </v-col>
        </v-row>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" color="grey" text @click="close">
            Відмінити
          </v-btn>
          <v-btn
            :disabled="loading"
            color="green darken-1"
            text
            @click="uploadAvatar"
            >{{ loading ? 'Збереження' : 'Зберегти' }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
    imgFile: null,
    fileUrl: null,
    uploadModal: false,
    loading: false,
  }),
  methods: {
    handleImage() {
      this.fileUrl = window.URL.createObjectURL(this.imgFile);
      this.uploadModal = true;
      setTimeout(() => {}, 500);
    },
    close() {
      this.uploadModal = false;
      this.imgFile = null;
    },
    uploadAvatar() {
      this.loading = true;
      const canvas = this.$refs.clipper.clip({ wPixel: 320 });
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('img', blob, 'avatar.png');
        this.$store
          .dispatch('auth/uploadAvatar', formData)
          .then((data) => {
            if (data.success) {
              return this.close();
            }
            this.$toast.error('Щось пішло не так. Спробуй знову');
          })
          .finally(() => {
            this.loading = false;
          });
      }, 'image/jpeg');
    },
  },
};
</script>

<style scoped lang="scss">
.modal-preview {
  max-width: 120px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
