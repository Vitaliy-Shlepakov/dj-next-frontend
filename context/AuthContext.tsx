import {useRouter} from "next/router";
import React, {createContext, useEffect, useState} from "react";
import {NEXT_URL} from "@/config";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Register
  const register = async (user) => {};

  // Login
  const login = async ({email: identifier, password}) => {
    setError(null);

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password,
      })
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      await router.push('/account/dashboard');
    } else {
      setUser(null);
      setError(data.message);
    }
  };

  // Logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user login
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const res: any = await fetch(`${NEXT_URL}/api/user`);
      const data: any = await res.json();

      if(res.ok) {
        setUser(data.user);
        await router.push('/account/dashboard');
      } else {
        setUser(null);
      }
    };
    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      error,
      register,
      login,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}