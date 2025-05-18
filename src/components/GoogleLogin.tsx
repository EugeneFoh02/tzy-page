'use client';

import { auth, provider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      // You can now store user info in Zustand, Redux, or Firebase DB
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <button onClick={handleLogin} className="p-2 bg-blue-600 text-white rounded">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
