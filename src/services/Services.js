import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'https://localhost:7001/';

class UserService {
  async postRequest(url,postData) {
    return await axios({
      method: 'post',
      url: url,
      data: postData,
      headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
  }).then(function (response) {
      return response.data;
  }).catch(function (error) {
      return error;
  });
  }

  async getRequest(url) {
    return await axios({
      method: 'get',
      url: url,
      headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
  }).then(function (response) {
      return response.data;
  }).catch(function (error) {
      return error;
  });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();