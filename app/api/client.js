import settings from "../config/settings";
import { create } from "apisauce";

const apiClient = create({
  baseURL: settings.apiUrl,
});

export default apiClient;
