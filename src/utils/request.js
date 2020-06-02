import axios from 'axios'
import Router from 'vue-router';
import router from '../router/index';
import cookies from 'js-cookie';
let token = cookies.get('token');
// create an axios instance
const request = axios.create({
  timeout: 5000 // request timeout
});
if (token && token != null && token != "") {
  request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// request拦截器
request.interceptors.request.use(
  config => {
    let token = cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

export default request
