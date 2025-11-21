export type ApiResponse<T> = {
  code: number;
  msg: string;
  success: boolean;
  data: T;
};
