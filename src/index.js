import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import Login from './components/components/partials/account/Login';
import Register from './components/components/partials/account/Register';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <ToastContainer autoClose={2000} />
      <QueryClientProvider client={queryClient}>

        <AuthContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </Router>
  </>
);

