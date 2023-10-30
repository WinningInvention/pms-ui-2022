import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://localhost:7001/";

class AuthService {
  async login(email, password) {
    const login = {
      // UserName: "Sanu0509",
      // Password: "Sanu0509",
      // EmailId: "Santanu@gamil.com"
      email: email,
      password: password
    }
    
  //  return await axios
  //     .post(API_URL + "api/login", objUser, { headers: authHeader() })
  //     .then((response) => {
  //       if (response.data.token) {
  //         localStorage.setItem("token", JSON.stringify(response.data));
  //       }
  //       return response.data;
  //     });
      
    return await axios({
        method: 'post',
        url: API_URL + 'api/Login/Login',
        data: login,
        headers: {
            'Content-Type': 'text/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }).then(function (response) {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
    }).catch(function (error) {
        return error;
    });

  }

  logout() {
    localStorage.removeItem("token");
  }

  register( userName, email, password) {
    return axios.post(API_URL + "signup", {
      userName,
      email,
      password,
    });
  }
}

export default new AuthService();