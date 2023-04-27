<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Comms from './components/Comms.vue';
</script>

<template>
  <div id="topper">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dev">Dev</RouterLink>
    </nav>
    <header>
      <img alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png" width="240" height="160" />
    </header>
  </div>
  

  <RouterView id="view"/>
  
  <footer>
    <Comms/>
    <audio id="music" src="https://audio.jukehost.co.uk/FUx1r78wxSbDlsaZ1KJajh2PZaBA46fK" type="audio/mpeg" autoplay loop></audio>
  </footer>
</template>

<style>
#topper{
  grid-area: topper;
  height: fit-content;
}

.logo{
  border-left: 8px ridge lightgray;  
  border-right: 8px ridge lightgray;


}

body {
  margin: 0;
  height: 100vh;
}

#app {

  background-image: url("/water.gif");
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
  ". topper ."
  ". main ."
  ". footer .";

}

header {
  height: fit-content;
  grid-area: header;
  display: flex;
  align-items: center;
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
  height: 25px;
  font-size: 12px;
  text-align: center;
  font: italic 1.2em "Fira Sans", serif;
  border: 8px ridge lightgray;
  background-color: #91d0d8;
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


},

mounted(){

let z = document.getElementsByTagName("main");
window.addEventListener('mousemove', (event)=> {
  let x = document.getElementById("music"); 
  x.play(); 
})



}

}

</script>
