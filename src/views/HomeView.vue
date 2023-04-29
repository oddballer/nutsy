<template>
  <main>
    <!-- <LoginView v-if="this.authStore.getToken == ''"/> -->
    <Chat/>
  </main>
</template>

<script>
import { useAuthenticationStore } from '../stores/AuthenticationStore';
import Chat from '../components/Chat.vue';
import LoginView from '../views/LoginView.vue';
export default {
    setup() {
        const authStore = useAuthenticationStore();
        return {
            authStore
        };
    },
    components: { Chat, LoginView }
}


</script>

<style>

main {
    height: 100%;
}

</style>