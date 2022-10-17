import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import { API_URL } from './../http/index';
import { AuthResponse } from './../models/response/AuthResponse.model';

import { User } from '../models/User.model';
import AuthService from '../services/AuthService';

export default class Store {
  user: User | null = null;
  isAuth: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser(null);
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      console.log('response', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
