import axios from 'axios';

export default {

  login(user) {
    return axios.post('https://nutsy.herokuapp.com/login', user)
  },

  register(user) {
    return axios.post('https://nutsy.herokuapp.com/register', user)
  }

}
