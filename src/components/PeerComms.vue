<template>
    <div id="comms">
        <div class="peer" v-for="user in users" v-bind:key="user.id">
            {{ user.id }}
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
                this.users = response.data;
            }).catch((error) =>{
                const message = "Could not retrieve peers from server: ";
                console.error(message + error);

            })
        }
    },
    

}
</script>

<style>

</style>