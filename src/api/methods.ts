import { api } from "./api";

type HttpMethod = "get" | "post" | "put" | "delete";

export interface Data {
  [key: string]: string | boolean | number | undefined | unknown; // Ajuste conforme necessário
}

function selectMethod(method: HttpMethod, url: string, data?: Data) {
  const callMethod = {
    get: () => api.get(url),
    post: () => api.post(url, data),
    put: () => api.put(url, data),
    delete: () => api.delete(url),
  };

  return callMethod[method]() || `Method ${method} not found!`;
}

export { selectMethod };
