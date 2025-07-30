

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORT THIS
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ WRAP YOUR APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
