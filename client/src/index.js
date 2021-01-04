import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Wrap the app in the provider for global state. This provides the entire app the global state (with user authentication).
import AuthProvider from "./Context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


