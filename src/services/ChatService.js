import axios from 'axios';

/**
 * This service class is used to interact with the Product API.
 * All methods return a Promise so that the calling code can handle both success and 
 * error responses appropriately. 
 */
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
