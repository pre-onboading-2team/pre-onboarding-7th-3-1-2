import axios from "axios";

import { BASE_URL, JSON_TYPE } from "../constant";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 2 * 1000,
  headers: {
    "Content-type": JSON_TYPE,
  },
});
