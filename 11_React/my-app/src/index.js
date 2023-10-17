import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JsxUse from './chapter3/3.4/JsxUse';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <App />

    // 3장 예제
    <JsxUse />  // 대문자로 만들어야함! (컴포넌트와 태그의 차이점)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
