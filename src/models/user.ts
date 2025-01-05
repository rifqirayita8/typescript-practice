export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: "admin" | "user";
}