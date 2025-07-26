import { useUser } from '@/context/UserContext';
import authTokenStorage from '@/storage/authTokenStorage';

export const useAuthToken = () => {
  const { user, setUser, clearUser } = useUser();

  const getToken = () => {
    return authTokenStorage.getToken();
  };

  const setToken = (token: string) => {
    setUser(token);
  };

  const removeToken = () => {
    clearUser();
  };

  return {
    token: getToken(),
    userId: user?.userId,
    setToken,
    removeToken,
  };
};
