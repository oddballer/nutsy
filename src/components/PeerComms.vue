<template>
    <div id="comms">
        <span>Online</span>
        <br>
        <div class="peer" v-for="user in users" v-bind:key="user">
            {{ user }}
        </div>
        <br>
        <div id="joinButton" @click="joinChat">
        <img src="user_world-1.png" alt="join chat">
        </div>
    </div>
   
  
</template>

<script>
import { useAuthenticationStore } from '../stores/AuthenticationStore'
import {Peer} from 'peerjs'
import PeerService from '../services/PeerService'

export default {
    setup(){
        const authStore = useAuthenticationStore();
        const peer = new Peer(authStore.$state.user.username, {
		host: "nutsy-peerjs.herokuapp.com",
        port: 443,
        path: '/',
        secure: true,
	});
    return {
        peer,
        authStore
    }

    },
    mounted(){
    this.getPeers();
    },
    data(){
        return {
        users: [],
    };
    },
    methods: {
        getPeers(){
            PeerService.getPeers().then((response) =>{
                console.log(response)
                this.users = response.data;
            }).catch((error) =>{
                const message = "Could not retrieve peers from server: ";
                console.error(message + error);

            })
        },
        joinChat(){
            
        }
    },
    

}
</script>

<style>
#comms{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;

    

}
#joinButton{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>