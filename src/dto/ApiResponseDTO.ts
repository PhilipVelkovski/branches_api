export interface ApiResponse<T> {
  success: boolean;
  data: T;
  page?: Number;
  limit?: Number;
  error?: string;
  total?: Number;
}