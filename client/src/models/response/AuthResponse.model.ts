import { User } from "../User.model";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
