import axios , { AxiosInstance }from "axios";
type AuthToken = string | null;
const client: AxiosInstance = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthHeader = (token: AuthToken): void => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    console.warn("Invalid token provided to setAuthHeader.");
  }
};

const clearAuthHeader = (): void => {
  client.defaults.headers.common.Authorization = "";
};

export { client, setAuthHeader, clearAuthHeader };
