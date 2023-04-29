import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if (currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: currentToken || '',
    user: currentUser || {},
    message: {},
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getMessage: (state) => state.message,
  },
  actions: {
    SET_AUTH_TOKEN(token) {
      this.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_SUCCESS(messageText) {
      this.SET_MESSAGE({
        level: "S",
        text: messageText,
      })
    },
    SET_ERROR(messageText) {
      this.SET_MESSAGE({
        level: "E",
        text: messageText,
      })
    },
    SET_MESSAGE(message) {
      this.message = message;
    },
    CLEAR_MESSAGE() {
      this.message = {};
    },
    LOGOUT() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token = '';
      this.user = {};
      axios.defaults.headers.common = {};
    }
  },
})