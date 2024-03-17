import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.request.use(
    config => {
      debugger;
      const token = localStorage.getItem('token');
      
      if(!config.headers['authorization'] || config.headers['authorization'] === null){
        config.headers['authorization'] = "Bearer " + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    response => {
      debugger;
      console.log("response : in interceptors" , response)
      if(!response.headers['authorization'] || response.headers['authorization'] === null){
        response.headers['authorization'] = "Bearer " ;

      }
      return response;
    },
    error => {
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login page
        console.error('Unauthorized access. Redirecting to login page...');
        window.location.href = '/'; // Redirect to login page
      }
      debugger;
      return Promise.reject(error.response.data.message);
    }
  );
  

root.render(
    <BrowserRouter>
         <App />
    </BrowserRouter>
);
reportWebVitals();
