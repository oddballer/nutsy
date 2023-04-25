<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Comms from './components/Comms.vue';
</script>

<template>
  <header>
    <img alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png" width="240" height="160" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <Comms/>
</template>

<style scoped>
#app {
  display: flex;
  align-content: center;
  justify-content: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>

<script>
export default {

    data(){
        return {
}


}
}

</script>
