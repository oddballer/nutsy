<template>
<div id="chatWindow">
    <div id="chatLog">
        <article v-for="chat in chats" v-bind:key="chat.chat_id">
            <div class="content">{{ chat.ts }}-------{{ chat.username }}: {{ chat.content }}</div>
        </article>
    </div>
    
    <div id="inputFields">
        <form v-on:submit.prevent="addChat(this.chat)">
            <input type="text" id="username" placeholder="Username" v-model="chat.username" required autofocus>
            <input type="text" id="content" placeholder="say something..." v-model="chat.content" required>
            <button type="submit">SEND</button>
        </form>
    </div>
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

    created(){
        this.getChat();
    }

}
</script>

<style>
.content{
background-color: #91d0d8;
font-size: 12px;
text-align: center;
font: italic 1.2em "Fira Sans", serif;
border: 8px ridge lightgray;
}
#chatWindow{
    display: grid;
    grid-template-rows: 9fr 1fr;
    grid-template-areas: 
    "log"    
    "input";

}
#inputFields{
    grid-area: input;
}
#chatLog{
    grid-area: log;
}

</style>