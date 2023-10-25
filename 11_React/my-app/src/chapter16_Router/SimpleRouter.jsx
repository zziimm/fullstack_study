import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './Pages/MainPage';
import PlacePage from './Pages/PlacePage';
import GamePage from './Pages/GamePage';
import HotGamePage from './Pages/HotGamePage';
import NewGamePage from './Pages/NewGamePage';
import NoMatchPage from './Pages/NoMatchPage';
// react-router-dom 설치하기
// npm install react-router-dom

// react-router-dom이란?
// 리액트를 위한 라우팅 라이브러리
// 라우팅: 사용자가 원하는 경로로 보내는 과정

// 페이지를 나누는 법
// 1) 리액트 미사용 시
// MPA라서 각 페이지 별 html 만듦
// /list 경로로 접속하면 해당 list.html 파일을 보내줌

// 2) 리액트 사용 시
// SPA라서 index.html 파일 하나만 존재
// List 컴포넌트를 만듦
// /list 경로로 접속하면 기존 컴포넌트 자리에 List 컴포넌트 보여줌

// 라우팅 구성을 위한 기본 컴포넌트
// 1) BrowserRouter, 2) Routes, 3) Route
// 1) BrowserRouter는 웹 브라우저에서 react-router를 사용하여 라우팅 할 수 있도록 해주는 컴포넌트
//    웹 브라우저의 history 객체를 이용해서 경로를 탐색할 수 있게 해줌
// 2) Routes는 여러 개의 Route 컴포넌트를 자식으로 가질 수 있음
// 3) Route는 Routes의 하위 컴포넌트로써 path(경로)와 element라는 props를 갖고 있음
//    여기에서 path는 경로를 의미, element는 경로가 일치할 경우 렌더링을 할 리액트 엘리먼트를 의미

// 사용자가 주소창에 새로운 경로를 입력하거나 페이지 내 경로 이동이 일어나게 되면 
// Routes 컴포넌트는 하위 자식으로 갖고 있는 Route 컴포넌트 중에서 현재 경로와 가장 일치하는 경로를 찾아 해당 엘리먼트를 반환
// 그러면 사용자에게 보이는 화면이 바뀌게 되는 것

// 더 많은 기능은 공식 문서 참고
// https://reactrouter.com/

// 라우팅: 해당 주소에서 해당 컴포넌트를 보여줘라
// 컴포넌트에 전환효과를 주고싶으면 조건부 렌더링을 사용해라 (등장/퇴장 모션같은거)
// 라우팅 해야할 때와 조건부 렌더링을 해야할 때를 구분하기



function SimpleRouter(props) {
  return (
    <BrowserRouter>
      <Routes>
        {/* /로 접속하면 MainPage 컴포넌트가 렌더링 */}
        {/* /place로 접속하면 PlacePage 컴포넌트가 렌더링 */}
        {/* /games로 접속하면 GamePage 컴포넌트가 렌더링 */}
        <Route path='/' element={<MainPage />} />
        <Route path='/places' element={<PlacePage />} />
        <Route path='/games' element={<GamePage />} />

        {/* 방법1. 서브 경로 설정 */}
        {/* <Route path='/games/hot' element={<HotGamePage />}/>
        <Route path='/games/new' element={<NewGamePage />}/> */}

        {/* 방법2. Nested Route 방식 */}
        {/* 서브 경로 방식과 차이점: 부모 엘리먼트 + 자식 엘리먼트가 같이 보임 */}
        {/* 부모 안에 자식들을 렌더링해서 보여줌(어디에 보여줄지는 부모안에서 Outlet 컴포넌트로 지정) */}
        {/* 활용 예: 헤더, 푸터 사이에 메인 영역 등 */}
        {/* Nested 안에 또 Nested 가능 */}
        <Route path='/games' element={<GamePage />}>
          <Route path='hot' element={<HotGamePage />} />
          <Route path='new' element={<NewGamePage />} />
        </Route>


        {/* 위에 설정한 라우팅 경로 이외에 경우 */}
        {/* * = 모든 이라는 뜻 match anything */}
        <Route path='*' element={<NoMatchPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default SimpleRouter;