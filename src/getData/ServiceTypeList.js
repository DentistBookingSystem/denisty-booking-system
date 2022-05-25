import axios from "axios";

const SERVICE_TYPE_REST_API = "http://localhost:8080/api/serviceType";

class ServiceTypeList {
  getSericeType() {
    return axios.get(SERVICE_TYPE_REST_API);
  }
}
export default new ServiceTypeList();
