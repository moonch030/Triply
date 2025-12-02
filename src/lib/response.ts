import type { ApiResponse } from "@/types/response.type";
import type { AxiosResponse } from "axios";

export function succesResponse<T>(res: AxiosResponse<ApiResponse<T>>) {
  if (!res.data.success) {
    throw res.data.msg;
  }

  return res.data.data;
}

export function errorResponse() {
  return (err: any) => {
    const message = err.response.data.msg;
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  };
}
