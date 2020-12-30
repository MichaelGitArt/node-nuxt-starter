import { apiClient } from './apiClient';

function logout() {
  return apiClient.post('auth/logout');
}

export default {
  logout,
};
