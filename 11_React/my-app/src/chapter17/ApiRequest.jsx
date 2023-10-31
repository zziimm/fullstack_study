import React, { useState } from 'react';
import axios, { Axios } from "axios";


function ApiRequest(props) {
  // 서버에서 가져온 데이터를 담은 state
  const [data, setData] = useState(null);

  // 1. Promise/then
  const handleRequsetById = (id) => {
    // jsonplaceholder에서 제공하는 테스트용 API를 호출
    axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => {
        console.log(response);
        setData(response.data); // aaxios 라이브러리가 알아서 JSON 데이터를 -> 객체로 변환해 주는 작업을 자동으로 해줌
      })
      .catch((error) => { // 요청 실패한 경우 에러 핸들링
        console.error(error);
      })
  };

  // 2. async/await로 리펙터링
  // async/await의 장점 : 비동기식을 동기식처럼 보이게 할 수 있다.
  const handleRequsetByIdAsync = async (id) => {
    try {
      const reaponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      setData(reaponse.data)
    } catch (error) {
      console.error(error);
      
    }

  };


  return (
    <>
      <div>
        <button onClick={() => handleRequsetById(123)}>불러오기 Promise/then</button>
        <button onClick={() => setData(null)}>비우기</button>
        <button onClick={() => handleRequsetByIdAsync(233)}>불러오기 async/await</button>
      </div>
      {data && (
        <>
          <textarea cols="70" rows="8" value={JSON.stringify(data, null, 2)} readOnly /> {/* stringify 인자값 (가져올 데이터,  , 들여쓰기) */}
          <p>{data.title}</p>
          <img src={data.thumbnailUrl} alt="thumbnailUrl" />
        </>
      )}
    </>
  );
}

export default ApiRequest;

// 서버에 데이터 요청하기
// 서버: 데이터 달라고 하면 데이터 주는 애
// 데이터: html, css, js 또는 JSON 데이터 등
// 요청: 서버에 정해놓은 규격대로 맞춰서 보내야 됨, 어디(URL 주소)로 어떤 방법(GET/POST 등)으로 보낼지 등
// 일반적으로 데이터를 가져올 때(검색, 조회)는 GET 요청
// 데이터를 보낼 때(추가, 수정, 삭제)는 POST 방식을 사용
// 그 외 PUT, PATCH, DELETE 등도 있음

// 자바스크립트를 이용하여 서버 쪽 데이터 요청 가능 = Ajax 사용하면 됨(비동기 방식, 새로고침 안됨)
// Ajax 기법을 사용하여 서버의 API를 호출함으로써 데이터를 수신
// Asynchronous JavaScript And XML, 비동기 자바스크립트와 XML

// Ajax 쓰는 다양한 방법
// 1. XMLHttpRequest(XHR) 객체 - (잘안씀)
// 이름에 XML이 들어가긴 하지만, XML 뿐만 아니라 모든 종류의 데이터를 가져올 수 있음
// 2. fetch() 함수 - ES6차의 HTTP 요청 함수
// 3. axios - 외부 라이브러리(제일 많이 씀)
// 라이브러리 쓰는 이유는? 편리하니까.. 코드도 간결하고 편의 기능도 많음

// Axios 라이브러리 설치
// npm install axios
// 기본 사용법
// axios.get('url').then();
// 공식 문서
// https://axios-http.com/kr/docs/intro

