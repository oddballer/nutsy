<template>
  <div id="login">
    <h1>who r u</h1>
    <form id="logForm" v-on:submit.prevent="login">
        <label for="username">Alias</label>
        <input
          type="text"
          id="username"
          placeholder="Alias"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Authentication Sequence</label>
        <input
          type="password"
          id="password"
          placeholder="Sequence"
          v-model="user.password"
          required
        />
        <div><button type="submit">I AM</button></div>
      <router-link v-bind:to="{ name: 'register' }">i will tell you</router-link>
    </form>
    <img id="loginImg" src="/dog.png" alt="a dog" v-on:click="playBark">
    <audio id="bark" src="https://audio.jukehost.co.uk/UScgVnfpLKU7mcBHmhINoRtinKxS2hiS"></audio>
  </div>
</template>

<script>
import authService from "../services/AuthService";
import { useAuthenticationStore } from '../stores/AuthenticationStore'


export default {

  setup(){
    const authStore = useAuthenticationStore()
    return {
      authStore
    }
  },


  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.authStore.CLEAR_MESSAGE();
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.authStore.SET_AUTH_TOKEN(response.data.token);
            this.authStore.SET_USER(response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            this.authStore.SET_ERROR(error);
          } else if (response.status === 401) {
            this.authStore.SET_ERROR("Invalid username and password!");
          } else {
            this.authStore.SET_ERROR(response.message);
          }
        });
    },
    playBark(){
    let x = document.getElementById("bark"); 

      x.play(); 
      
    },
  },
}
</script>

<style scoped>
#login{
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  align-items: center;
  justify-items: center;
  height: 100%;

}
#logForm{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1{
  width: fit-content;
}
#loginImg{
  height: 300px;
  width: 200px;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
  cursor: pointer;
}
input, button{
  margin-bottom: 5%;
  text-align: center;

}
</style>
