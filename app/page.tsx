'use client';

import { useState } from 'react';
import { setToken, setUser } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import { toast } from "react-hot-toast";



const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const {user, login, logout} = useAuthSession();
  
  const handleLogin = async () => {
    // Implement the logic to authenticate the user
    if(username === '') {
      toast.error('Username is required')
      return;
    }
    if(password === '') {
      toast.error('Password is required')
      return;
    }
    await login(username, password);
    setUsername('');
    setPassword('');
    if(user) {
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully Loged-out!')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">Welcome, {user.username}</h2>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this: abkfjabsjdf </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
