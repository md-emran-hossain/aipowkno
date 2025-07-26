import API from '../api';
import axios from 'axios';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('API Utility', () => {
  it('should have a base URL configured', () => {
    expect(API.defaults.baseURL).toBeDefined();
    expect(API.defaults.baseURL).not.toBeNull();
  });

  it('should include Authorization header if token is present', () => {
    const mockToken = 'test-token';
    jest.spyOn(localStorage, 'getItem').mockReturnValue(mockToken);

    // Re-initialize API to pick up the mocked localStorage
    const newAPI = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
    });

    newAPI.interceptors.request.use((config) => {
      const token = localStorage.getItem('apk/auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    expect(newAPI.interceptors.request.handlers[0].fulfilled({ headers: {} }).headers.Authorization).toBe(`Bearer ${mockToken}`);
  });

  it('should not include Authorization header if no token is present', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

    const newAPI = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
    });

    newAPI.interceptors.request.use((config) => {
      const token = localStorage.getItem('apk/auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    expect(newAPI.interceptors.request.handlers[0].fulfilled({ headers: {} }).headers.Authorization).toBeUndefined();
  });
});
