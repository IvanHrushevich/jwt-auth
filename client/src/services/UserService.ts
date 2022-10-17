import { AxiosResponse } from 'axios';

import $api from '../http';
import { User } from '../models/User.model';

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users');
  }
}
