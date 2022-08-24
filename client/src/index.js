import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthReducerProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <AuthReducerProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
    </AuthReducerProvider>


  </React.StrictMode>
);
