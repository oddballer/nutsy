import axios from 'axios';
export default {

  

  getChat() {
    return axios.get('https://nutsy.herokuapp.com/chat');
  },

  addChat(chat) {
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': '',

      }
    }

    const item = {
      "username": chat.username,
      "content": chat.content,
    };
    return axios.post('https://nutsy.herokuapp.com/chat/new', item);
  },

}
