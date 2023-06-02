import axios from "axios";
export default{

    getPeers(){
        return axios.get('https://nutsy-peerjs.herokuapp.com')
    }

}
