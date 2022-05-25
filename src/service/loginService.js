import axios from "axios";
const LOGIN_API = "http://localhost:8080/login";
class AccountService {
  login(phone, password) {
    return axios.post(LOGIN_API, { phone, password }).then((Response) => {
      if (Response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(Response.data));
      }
      console.log(Response.data);
      return Response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AccountService();
