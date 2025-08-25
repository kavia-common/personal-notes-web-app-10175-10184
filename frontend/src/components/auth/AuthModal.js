import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
export default function AuthModal({ open, onClose }) {
  /**
   * PUBLIC_INTERFACE
   * Shows a modal allowing user to login, signup or logout.
   * This demo does not call a backend; it stores the email in localStorage via AuthContext.
   */
  const { user, login, signup, logout } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');

  if (!open) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') login(email);
    if (mode === 'signup') signup(email);
    onClose();
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Authentication">
        {user ? (
          <>
            <h3>Account</h3>
            <p className="helper">Signed in as {user.email}</p>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn" onClick={onClose}>Close</button>
              <button className="btn-danger btn" onClick={() => { logout(); onClose(); }}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
              <div className="row">
                <button className="btn" onClick={() => setMode('login')} aria-pressed={mode === 'login'}>Login</button>
                <button className="btn" onClick={() => setMode('signup')} aria-pressed={mode === 'signup'}>Sign up</button>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gap: 8, margin: '10px 0 16px' }}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary btn">{mode === 'login' ? 'Login' : 'Sign up'}</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
