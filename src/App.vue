<template>
  <div id="topper">
    <nav>
      <img v-on:click="playMusic" alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png" width="200" height="133" />
    </nav>
    <header v-if="authStore.token != ''">
      <div class="navBtn">
        <!-- <RouterLink to="/" > -->
        <img id="homeBtn" src="/world-4.png" alt="home">
        Home
      <!-- </RouterLink> -->
      </div>
      <div class="navBtn">
        <!-- <RouterLink to="/dev" > -->
        <img id="devBtn" src="/internet_options-0.png" alt="dev">
        Dev
      <!-- </RouterLink> -->
      </div>
      
      <div class="navBtn">
        <img id="logoutBtn" src="/standby_monitor_moon_cool-4.png" alt="logout" v-on:click="logOff" v-if="authStore.token != ''">
        Logout
      </div>
      
    </header>
  </div>

  <div id="newsContainer">
    <!-- <NewsBar/> -->
  </div>
  
  <div id="mainView">
    <RouterView class="view"/>
  </div>
  
  <div id="bottom">

    <footer>
      <img src="/microsoft-backoffice-1996.gif" alt="powered by ms backoffice">
      <a href="https://www.gamefaqs.com">
        <img src="/bar2001.gif" alt="gameFaqs">
      </a>
      <img src="/frontpage-1996.gif" alt="made with frontpage">
      <audio id="music" src="https://audio.jukehost.co.uk/AsU2G82R0rMe5rNLL10jSHZqke3JcfZ0" type="audio/mpeg" loop></audio>
      <img src="https://hitwebcounter.com/counter/counter.php?page=8523078&style=0040&nbdigits=5&type=page&initCount=0" Alt="web counter"/>
      <img src="/mac-mall-1998.gif" alt="mac-mall-offer">
      <img src="/clickconf.gif" height="48" alt="esrb" id="esrb" v-on:click="say('thank you for confirming your privacy')">
    </footer>
  </div>

</template>

<style>
/* not working, diff way to read device width in vuejs? */

/* @media screen and (min-width: 768) {
  footer > img {
  width: 20%;
}
footer {
  display: flex;
  align-items: center;
  border: 8px ridge lightgray;
  justify-content: center;
  width: 55vw;
}
} */

#esrb:hover{
  cursor: pointer;
}

#topper{
  grid-area: topper;
  height: fit-content;
  width: 100%;
  text-align: center;
}

.logo{
  border-left: 8px ridge lightgray;  
  border-right: 8px ridge lightgray;
  cursor: pointer;
  
}

body {
  margin: 0;
  
}

#app {
  background-image: url("/water.gif");
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas:
  "newsBar topper ."
  "newsBar main ."
  "newsBar footer .";

}

#newsContainer{
  /* border goes on internal component, not container */
  /* border: 8px ridge lightgray; */
  grid-area: newsBar;
  width: 75%;
  height: 75%;
}

header {
  height: fit-content;
  padding: 10px;
  grid-area: header;
  display: flex;
  justify-content: space-around;
  border-right: 8px ridge lightgray;
  border-left: 8px ridge lightgray;
  border-bottom: 8px ridge lightgray;


  /* background-image: url(/sandTexture.png); */
  /* background-color: #e7d6c4; */

}

header div {
  display: flex;
  height: 75px;
  width: 75px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header img {
  height: 50px;
  width: 50px;
}

.navBtn {
  text-decoration: none;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

#mainView {
  grid-area: main;
  width: 100%;

}

.view {
  border: 8px ridge lightgray;
  height: fit-content;
}

footer {
  display: flex;
  align-items: center;
  border: 8px ridge lightgray;
  justify-content: center;
}


#bottom {
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}

nav {
  grid-area: nav;
  height: fit-content;
  font-size: 12px;
  text-align: center;
  font: italic 1.2em "Fira Sans", serif;
  border: 8px ridge lightgray;
  /* background-color: #91d0d8; */
  display: flex;
  justify-content: center;
  align-items: center;
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
#logoutBtn{
  cursor: pointer;
}

</style>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthenticationStore } from './stores/AuthenticationStore'
import NewsBar from './components/NewsBar.vue'

export default {
    setup() {
        const authStore = useAuthenticationStore();
        return {
            authStore
        };
    },
    data() {
        return {
            playing: false,
        };
    },
    mounted() {
        // let z = document.getElementsByTagName("main");
        // window.addEventListener('mousemove', (event)=> {
        //   let x = document.getElementById("music"); 
        //   x.play(); 
        // })
    },
    methods: {
        say(message) {
            alert(message);
        },
        playMusic() {
            let x = document.getElementById("music");
            if (this.playing) {
                x.pause();
                this.playing = false;
            }
            else {
                x.play();
                this.playing = true;
            }
        },
        logOff() {
            this.authStore.LOGOUT();
            this.$router.push("/login");
        },
    },
    components: { NewsBar }
}

</script>
