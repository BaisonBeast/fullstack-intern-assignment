import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth, setToken } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from 'axios';
import { toast } from "react-hot-toast";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session

  useEffect(() => {
    // Check if user is already authenticated
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      dispatch(setToken(storedToken));
      dispatch(setUser(JSON.parse(storedUser)));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, [dispatch]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      toast.success('Login successful');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    }
  }

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return {user, login, logout};
};

export default useAuthSession;
