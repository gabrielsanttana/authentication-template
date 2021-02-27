import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginService = (data: LoginRequest) =>
  api('url', {
    method: 'post',
    data,
  });
