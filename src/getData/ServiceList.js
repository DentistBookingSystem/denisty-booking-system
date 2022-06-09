import axios from "axios";

const SERVICE_REST_API = "http://localhost:8080/rade/service/";

class ServiceList {
  getSericeType(id) {
    return axios.get(SERVICE_REST_API + id);
  }
}
export default new ServiceList();
