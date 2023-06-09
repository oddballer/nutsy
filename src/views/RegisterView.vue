<template>
  <div id="register">
    <h1>become</h1>
    <form id="registerForm" v-on:submit.prevent="register">
        <label for="username">Alias</label>
        <input
          type="text"
          id="username"
          placeholder="Alias"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Authentication sequence</label>
        <input
          type="password"
          id="password"
          placeholder="Sequence"
          v-model="user.password"
          required
        />
        <label for="confirmPassword">Confirm sequence</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Sequence"
          v-model="user.confirmPassword"
          required
        />
        <div>
          <button type="submit">BECOME</button>
        </div>
      <router-link v-bind:to="{ name: 'login' }">i am known here</router-link>
    </form>
    <img id="registerImg" src="/dog2.png" alt="a dog" v-on:click="playBark">
    <audio id="bark" src="https://audio.jukehost.co.uk/rOPSoOTFIBxlz6sFRtXwmVjs39df0i8o"></audio>
  </div>
</template>

<script>
import authService from "../services/AuthService";
import { useAuthenticationStore } from '../stores/AuthenticationStore'


export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
      },
    };
  },
  setup(){
    const authStore = useAuthenticationStore()
    return {
      authStore
    }
  },
  methods: {
    error(msg) {
      this.authStore.SET_ERROR(msg);
    },
    success(msg) {
      this.authStore.SET_SUCCESS(msg);
    },
    register() {
      this.authStore.CLEAR_MESSAGE();
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                // Show the validation errors
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
    playBark(){
    let x = document.getElementById("bark"); 

      x.play(); 
      
    },
  },
};
</script>

<style scoped>
#register{
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  align-items: center;
  justify-items: center;
  height: 100%;

}
#registerForm{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1{
  width: fit-content;
}
#registerImg{
  height: 300px;
  width: 200px;
  align-items: center;
  opacity: 0.75;
  cursor: pointer;
}
input, button{
  margin-bottom: 5%;
  text-align: center;
}
</style>
