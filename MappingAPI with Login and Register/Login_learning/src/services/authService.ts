import {API_ENDPOINTS} from '../config/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;  
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}

class AuthService {
  async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USER.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async login(userData: LoginData): Promise<LoginResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.USER.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
export default authService;