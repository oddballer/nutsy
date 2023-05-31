<template>
  <div id="topper">
    <!-- <header v-if="authStore.token != ''"> -->

      <!-- <img v-on:click="playMusic" alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png"/> -->
      
      <div class="nutsyAscii" v-on:click="playMusic">
        <pre>
      ___           ___                       ___                 
     /__/\         /__/\          ___        /  /\          ___   
     \  \:\        \  \:\        /  /\      /  /:/_        /__/|  
      \  \:\        \  \:\      /  /:/     /  /:/ /\      |  |:|  
  _____\__\:\   ___  \  \:\    /  /:/     /  /:/ /::\     |  |:|  
 /__/::::::::\ /__/\  \__\:\  /  /::\    /__/:/ /:/\:\  __|__|:|  
 \  \:\~~\~~\/ \  \:\ /  /:/ /__/:/\:\   \  \:\/:/~/:/ /__/::::\  
  \  \:\  ~~~   \  \:\  /:/  \__\/  \:\   \  \::/ /:/     ~\~~\:\ 
   \  \:\        \  \:\/:/        \  \:\   \__\/ /:/        \  \:\
    \  \:\        \  \::/          \__\/     /__/:/          \__\/
     \__\/         \__\/                     \__\/                
    </pre>
    </div>

    <!-- </header> -->
  </div>

  <div id="newsContainer" v-if="authStore.token != ''">
    <NewsBar/>
  </div>
  
  <div id="mainView">
    <RouterView class="view"/>
  </div>

  <nav>

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
  </nav>
  
  <div id="bottom">

    <footer class="footbox">
      <img src="/microsoft-backoffice-1996.gif" alt="powered by ms backoffice">
      <a href="https://www.gamefaqs.com">
        <img src="/bar2001.gif" alt="gameFaqs">
      </a>
      <img src="/frontpage-1996.gif" alt="made with frontpage">
      <audio id="music" src="https://audio.jukehost.co.uk/AsU2G82R0rMe5rNLL10jSHZqke3JcfZ0" type="audio/mpeg" loop></audio>
      <img src="https://hitwebcounter.com/counter/counter.php?page=8523078&style=0040&nbdigits=5&type=page&initCount=0" Alt="web counter"/>
      <a class="footbox" href="https://web.archive.org/web/20000815061402/http://www.cc-inc.com/macmall/">
      <img src="/mac-mall-1998.gif" alt="mac-mall-offer">
      </a>
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

.nutsyAscii{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font: bold 1.4em "Fira Sans";
  white-space: pre;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  
}

#newsContainer{
    border: 8px ridge lightgray;
}

.footbox {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#esrb:hover{
  cursor: pointer;
}

#topper{
  grid-area: topper;
  width: 75%;
}

.logo{
  height: 12vh;
  width: 18vh;
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
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
  "newsBar topper nav"
  "newsBar main nav"
  "newsBar footer nav";

}

#newsContainer{
  /* border goes on internal component, not container */
  /* border: 8px ridge lightgray; */
  grid-area: newsBar;
  width: 75%;
  height: 75%;
}

header {
  grid-area: header;
  border: 8px ridge lightgray;


  /* background-image: url(/sandTexture.png); */
  /* background-color: #e7d6c4; */

}

/* header div {
  display: flex;
  height: 75px;
  width: 75px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
} */

.navBtn {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  cursor: default;
  padding: 10px;
}

.navBtnSelected {

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
  
  border: 8px ridge lightgray;
}


#bottom {
  grid-area: footer;
  width: 100%;
}

nav {
  grid-area: nav;
  font-size: 12px;
  text-align: center;
  font: italic 1.2em "Fira Sans", serif;
  /* background-color: #91d0d8; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-area: nav;
  width: 75%;
  height: 75%;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid white;
} */

nav a:first-of-type {
  border: 0;
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
