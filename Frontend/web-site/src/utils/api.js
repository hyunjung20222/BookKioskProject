import axios from 'axios';
import store from "../redux/configStore";
import {jwtUtils} from "./jwtUtils";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : ''
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().Auth.token;
    try {
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error('[_axios.interceptors.request] config : ' + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;