import type { AxiosResponse } from "axios";

export function succesResponse<T>(res: AxiosResponse<T>) {
  return res.data;
}

export function errorResponse() {
  return (err: any) => {
    const message = err.response.data;
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  };
}
