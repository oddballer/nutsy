<template>
    <div id="comms">
        <span id="online">Online</span>
        <br>
        <div id="peerContainer">
            <div class="peer" v-for="user in users" v-bind:key="user">
                {{ user }}
            </div>
        <br>
        </div>
        <div id="joinButton" @click="joinChat" title="Join Voice Chat">
        <img src="/user_world-1.png" alt="join chat">
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
        connections: [],
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
            this.users.forEach((user) =>{
                var conn = this.peer.connect(user);

                conn.on('open', function() {
	            // Receive messages
	            conn.on('data', function(data) {
	            console.log('Received', data);
	
                    });
                        });
                            });
                },
    

            }
        }
</script>

<style>
#online{
    font: 1.0em "Fira Sans", serif;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: white;
}
#comms{
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;

}
#peerContainer{
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 83%;
    overflow-y: hidden;
    text-align: start;
    overflow-x: hidden;

}
.peer{
    margin-top: 5%;
}
#joinButton{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}
</style>