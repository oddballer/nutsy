<template>
<div id="chatWindow">
    
    <div id="chatLog">
        <article v-for="chat in chats" v-bind:key="chat.chat_id">
            <div class="content">
               <div id="logUsername">{{ chat.username }} <span id="logTs"> @ {{ chat.ts }} </span> </div>
               
               <div id="logContent">{{ chat.content }}</div>
            </div>
        </article>
    </div>
    
        <form name="chatFields" id="inputFields" v-on:submit.prevent="addChat(this.chat)" autocomplete="off">
            <input type="text" id="content" placeholder="say something..." v-model="chat.content" required>
            <button id="chatSubmit" type="submit">
                <img id="saveImg" src="/channels-3.png" alt="saveBtn" height="24" width="24">
            </button>
        </form>
    <audio id="loadSfx" src="https://audio.jukehost.co.uk/m5mH7M1xzybl0GdKTlJJtwC6yl8d9DgW"></audio>
</div>
    
</template>

<script>
import ChatService from '../services/ChatService';
import { useAuthenticationStore } from '../stores/AuthenticationStore'

export default {

    setup(){
    const authStore = useAuthenticationStore()
    return {
      authStore
    }
  },

    data() {
    return {
      isLoading: false,
      chats: [],
      chat: {
        username: "",
        content: ""
      },
    };
  },

    methods: {

        prepTimestamps(chats){
            chats.forEach((i)=> {
                i.ts = new Date(i.ts);
            });
        },

        getChat(){
            this.isLoading = true;
            ChatService.getChat().then((response) => {
                this.chats = response.data;
                this.prepTimestamps(this.chats);
                this.isLoading = false;
            }).catch((error) => {
                this.isLoading = false;
                const message = "Could not retrieve chat history from server.";
                console.error(message);

                if (error.response.status == 401) {
                    this.authStore.SET_AUTH_TOKEN('');
                    this.authStore.SET_USER('');
                    this.$router.push("/login");
                }

            });

        },

        addChat(chat) {
            this.isLoading = true;
            let x = document.getElementById("loadSfx"); 
            x.play();
            ChatService
            .addChat(chat)
            .then(() => {
          // SUCCESS
         // this.$store.commit("SET_SUCCESS", `Added '${product.name}' to cart`);
          this.isLoading = false;
          this.chat.username = '';
          this.chat.content = '';
          this.getChat();
        })
        .catch((error) => {
          this.isLoading = false;
          const response = error.response;
          const message =
            "Chatting was unsuccessful - " + response;
        //  this.$store.commit("SET_ERROR", message);
          console.error(message);
        });
    },
    },

    mounted(){
        this.getChat();
    },

}
</script>

<style scoped>
.content{
font-size: 12px;
text-align: left;
font: 1.4em monospace, serif;
/* border: 8px ridge lightgray; */
padding: 10px;
padding-left: 20px;
display: grid;
grid-template-areas: 
"loguser logTs"
"logcontent logcontent";
grid-template-columns: 1fr;
}
#logUsername{
grid-area: loguser;
font: bold;
display: flex;
align-items: center;
justify-content: start;
color: white;
margin-bottom: 1%;
}
#logContent{
grid-area: logcontent;
color: lightgray;
}
#logTs{
    font-size: 12px;
    margin-left: 1%;
}
#chatWindow{
    display: grid;
    grid-template-rows: 50vh 4vh;
    grid-template-areas: 
    "log"    
    "input";
    /* background-color: #e7d6c4; */

}
#inputFields{
    grid-area: input;
    display: grid;
    /* border: 8px ridge lightgray; */
    border-top: 8px ridge lightgray;
    grid-template-columns: 95% 5%;
    grid-template-areas: 
    "content chatSubmit";
    /* background-color: #91d0d8; */
    


}
#chatLog{
    grid-area: log;
    overflow-y: scroll;
    position: relative;
    flex-direction: column-reverse;
    display: flex;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: white;

    
}
#chatSubmit{
    grid-area: chatSubmit;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
#content{
    grid-area: content;
    background-color: transparent;
    border: none;
    border-right: 8px ridge lightgray;
    font-weight: 700;
    text-align: center;

}
#content:focus{
    background-color: #91d0d8;
    outline: none;
    color: grey;
}
#chatUsername:focus{
    background-color: #91d0d8;
    outline: none;
    color: grey;
}
img{
    opacity: 0.75;
}
</style>