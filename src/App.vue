<template>
  <div id="topper">
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dev">Dev</RouterLink>
        <img id="logOut" src="/logout.png" alt="logout" height="16" width="16" v-on:click="logOff" v-if="authStore.token != ''">
    </nav>
    <header>
      <img v-on:click="playMusic" alt="nutsy logo" class="logo" src="https://static.wikia.nocookie.net/finalfantasy/images/3/33/ClanNutsy.png" width="240" height="160" />
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
      <audio id="music" src="https://audio.jukehost.co.uk/FUx1r78wxSbDlsaZ1KJajh2PZaBA46fK" type="audio/mpeg" loop></audio>
      <img src="https://hitwebcounter.com/counter/counter.php?page=8523078&style=0040&nbdigits=5&type=page&initCount=0" Alt="web counter"/>
      <img src="/mac-mall-1998.gif" alt="mac-mall-offer">
      <img src="/clickconf.gif" height="48" alt="esrb" id="esrb" v-on:click="say('thank you for confirming your privacy')">
    </footer>
  </div>

</template>

<style>
#esrb:hover{
  cursor: pointer;
}

#topper{
  grid-area: topper;
  height: fit-content;
  width: 100%;
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
  margin: 0;
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
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 8px ridge lightgray;
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
  width: 100%;

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
  height: 25px;
  font-size: 12px;
  text-align: center;
  font: italic 1.2em "Fira Sans", serif;
  border: 8px ridge lightgray;
  background-color: #91d0d8;
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
#logOut{
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
