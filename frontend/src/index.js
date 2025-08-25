import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// PUBLIC_INTERFACE
// Entrypoint: renders the Notes app into #root.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
