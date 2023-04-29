<template>
<div id="chatWindow">
    
    <div id="chatLog">
        <article v-for="chat in chats" v-bind:key="chat.chat_id">
            <div class="content">
               <div id="logUsername">{{ chat.username }}:</div>
               <div id="logContent">{{ chat.content }}</div>
            </div>
        </article>
    </div>
    
        <form name="chatFields" id="inputFields" v-on:submit.prevent="addChat(this.chat)">
            <input type="text" id="content" placeholder="say something..." v-model="chat.content" required>
            <button id="chatSubmit" type="submit">
                <img id="saveImg" src="/floppy.png" alt="saveBtn" height="24" width="24">
            </button>
        </form>
    <audio id="loadSfx" src="/000017e4.wav"></audio>
</div>
    
</template>

<script>
import ChatService from '../services/ChatService';
export default {
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
        getChat(){
            this.isLoading = true;
            ChatService.getChat().then((response) => {
                this.chats = response.data;
                this.isLoading = false;
            }).catch((error) => {
                this.isLoading = false;
                const message = "Could not retrieve chat history from server.";
                console.error(message);
            })
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
            "Chatting was unsuccessful";
        //  this.$store.commit("SET_ERROR", message);
          console.error(message);
        });
    },
    },

    mounted(){
        this.getChat();
    }

}
</script>

<style scoped>
.content{
font-size: 12px;
text-align: left;
font: italic 1.2em "Fira Sans", serif;
/* border: 8px ridge lightgray; */
padding: 5px;
display: grid;
grid-template-areas: 
"loguser logcontent";
grid-template-columns: 3fr 7fr;
}
#logUsername{
grid-area: loguser;
}
#logContent{
grid-area: logcontent;
}
#chatWindow{
    display: grid;
    grid-template-rows: 50vh 4vh;
    grid-template-areas: 
    "log"    
    "input";

}
#inputFields{
    grid-area: input;
    display: grid;
    /* border: 8px ridge lightgray; */
    border-top: 8px ridge lightgray;
    grid-template-columns: 95% 5%;
    grid-template-areas: 
    "content chatSubmit";

}
#chatLog{
    grid-area: log;
    overflow-y: scroll;
    position: relative;
    
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