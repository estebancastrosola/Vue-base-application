import axios from 'axios';

export default {
  userLogin(payload) {
    return axios.post('/authentication', payload);
  },
};
