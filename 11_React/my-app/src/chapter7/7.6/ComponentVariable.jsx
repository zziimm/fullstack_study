import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

// 리액트에서 사용하는 변수들에 대해 알아보자

// 전역 변수 (컴포넌트 밖에서 선언하면)
// 렌더링과 상관없는 '고정값'들은 전역 변수로 선언
// 보통 상수 지정 시
const glodalConstantVar = 1;

function ComponentVariable(props) {
  console.log('컴포넌트 렌더링!!');

  // 지역 상태(local state)
  // 값이 변경되면 재렌더링 발생
  const [count, setCount] = useState(glodalConstantVar);
  console.log('count', count);

  // 지역 변수
  // 값은 변경되지만 재렌더링 되지 않음
  // 렌더링 될 때마다 초기화 됨
  let id = 1;
  console.log('id', id);

  // useRef()로 만든 지역 변수

  // 값은 변경되지만 재렌더링 되지 않음
  // => 렌더링과 관련이 없는 데이터에 대한 변수 선언은 useRef()를 사용
  // => 불필요한 렌더링 방지를 위해 렌더링과 관련이 있는 데이터만 state 로 사용!!

  // 매번 렌더링 될 때마다 항상 같은 래퍼런스 객체를 반환(전체 생명주기에 걸쳐 유지됨)
  // => 그래서 렌더링이 될 때 값이 초기화 되지 않음
  // current라는 속성 안에 1 이라는 값이 들어가 있는 것임
  const idRef = useRef(1);
  console.log('idRef', idRef);
  return (
    <>
      <p>총 {count}번 렌더링</p>
      <button onClick={() => {
        setCount(count + 1);
      }}> 
        count 업데이트 <br />
        (재렌더링 발생)
      </button>

      <p>현재 id값: {id}</p>
      <button onClick={() => {
        id++;
        console.log(id);
        idRef.current++;
      }}> 
        id 업데이트 <br />
        (재렌더링 안됨)
      </button>
    </>
  );
}


export default ComponentVariable;