const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  USER: {
    REGISTER: `${API_BASE_URL}/api/user/register`,
    LOGIN: `${API_BASE_URL}/api/user/login`,
  }
};

export default API_BASE_URL;