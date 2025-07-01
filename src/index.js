import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Analytics } from '@vercel/analytics/react';
// import reportWebVitals from './reportWebVitals';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <>
    <App />
    <Analytics 
      mode="production" 
      debug={false}
      beforeSend={(event) => {
        // Loại bỏ các sự kiện từ các địa chỉ IP nội bộ
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          return null;
        }
        return event;
      }}
    />
  </>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
