import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JsxUse from './chapter3/3.4/JsxUse';
import Library from './chapter3/Library';
import Clock from './chapter4/Clock';
import PropsUse from './chapter5/5.3/PropsUse';
import CommentList from './chapter5/CommentList';
import CommentEx from './chapter5/5.6/CommentEx';
import Com from './practise/Com';
import NotificationList from './chapter6/NotificationList';
import Counter from './chapter7/7.2/Counter';
import SetStateMerge from './chapter7/7.2/SetStateMerge';
import Toggle from './chapter8/8.1/Toggle';
import MyButton from './chapter8/8.2/MyButton';
import ConfirmButton from './chapter8/ConfirmButton';
import Greeting from './chapter9/9.1/Greeting';
import LoginControl from './chapter9/9.2/LoginControl';
import LoginControlRefactoring from './chapter9/9.3/LoginControlRefactoring';
import Mailbox from './chapter9/9.3/Mailbox';
import MainPage from './chapter9/9.4/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 4장 예제
// 1초마다 Clock 컴포넌트를 렌더링 하는 코드
// (실제 개발에서 이렇게 쓰는 경우는 없고 State를 변경해서 재렌더링 시킴)
// setInterval(() => {
//     root.render(
//         <Clock />
//     );
// }, 1000);

// 9장 예제
const messages = ['React', 'Re: React', 'Re:Re: React'];
// const messages = [];

root.render(
    // <App />

    // 3장 예제
    // <JsxUse />  // 대문자로 만들어야함! (컴포넌트와 태그의 차이점)
    // <Library />
    // <Clock />

    // 5장 예제
    // <PropsUse />

    // <CommentList />
    // <CommentEx author={{avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", name: "천지민"}}
    // text="안녕하세요"
    // date="2023-10-18"/>

    <Com 
    profile={{imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", userName: "지민지"}}
    text="리액트 연습하기"
    date="2023-10-20"
    />
    // 6장 예제
    // <NotificationList />

    // 7장 예제
    // <Counter />
    // <SetStateMerge />

    // 8장 예제
    // <Toggle />
    // <MyButton />

    // <ConfirmButton />

    // <Greeting isLoggedIn={true} />

    // <LoginControl />
    // <LoginControlRefactoring />

    // <Mailbox unreadMessages={messages} />

    // <MainPage />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
