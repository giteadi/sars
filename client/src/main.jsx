import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store'; // Use named imports for store and persistor
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
