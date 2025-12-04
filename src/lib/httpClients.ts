import type { AxiosInstance } from "axios";
import axios from "axios";

class Http {
  instance: AxiosInstance;
  private readonly baseUrl = import.meta.env.VITE_API_URL;

  constructor() {
    this.instance = axios.create({ baseURL: this.baseUrl });
  }
}

export default new Http();