import { apiClient } from './apiClient';

function getProfile(reqOptions) {
  return apiClient.get('profile/base', reqOptions);
}

function checkFreeNickname(formData, source) {
  return apiClient.post('profile/check-nickname', formData, {
    cancelToken: source.token,
  });
}

function updateProfile(formData) {
  return apiClient.post('profile/update', formData);
}

export default {
  getProfile,
  checkFreeNickname,
  updateProfile,
};
