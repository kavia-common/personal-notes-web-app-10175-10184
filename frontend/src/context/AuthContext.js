import React, { createContext, useContext, useMemo, useState } from 'react';
import { load, save, remove } from '../utils/storage';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * PUBLIC_INTERFACE
   * Provides simple client-side authentication state.
   * This demo stores a "user" object in localStorage. Replace with real API calls later.
   */
  const [user, setUser] = useState(() => load('user', null));

  const login = (email) => {
    const u = { email };
    setUser(u);
    save('user', u);
  };
  const signup = (email) => {
    // In this demo, signup is same as login.
    const u = { email };
    setUser(u);
    save('user', u);
  };
  const logout = () => {
    setUser(null);
    remove('user');
  };

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth state and actions. */
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
