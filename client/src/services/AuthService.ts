import { AxiosResponse } from 'axios';

import { AuthResponse } from './../models/response/AuthResponse.model';
import $api from '../http';

export default class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const body = { email, password };
    return $api.post<AuthResponse>('/registration', body);
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const body = { email, password };
    return $api.post<AuthResponse>('/login', body);
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/logout');
  }
}
