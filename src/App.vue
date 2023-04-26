<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Comms from './components/Comms.vue';
</script>

<template>
  <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dev">Dev</RouterLink>
  </nav>
  <header>
    <img alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png" width="240" height="160" />

    <div class="wrapper">
      
    </div>
  </header>

  <RouterView id="view"/>
  
  <footer>
    <Comms/>
    <audio src="/Akanon.mp3" type="audio/mpeg" autoplay loop></audio>
  </footer>
</template>

<style>

body {
  margin: 0;
  height: 100vh;
}

#app {

  background-image: url("/water.gif");
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: space-around;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
  ". nav ."
  ". header ."
  ". main ."
  ". footer .";

}

header {
  grid-area: header;
  display: flex;
  align-content: center;
  justify-content: center;
  border: 8px ridge lightgray;
}

#view {
  grid-area: main;
  border: 8px ridge lightgray;

}

footer {
  grid-area: footer;
  display: flex;
  align-content: center;
  justify-content: center;
  border: 8px ridge lightgray;

}

nav {
  grid-area: nav;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid white;
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
