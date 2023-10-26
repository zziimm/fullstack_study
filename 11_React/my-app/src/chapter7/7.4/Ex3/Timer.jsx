import React from 'react';
import { useEffect } from 'react';

function Timer(props) {
  // 화면에 처음 렌더링 됐을 때 한번만 타이머를 작동시킴
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 실행 중..');
    }, 1000);

    // 화면에서 사라질 때 만든 타이머 정리하기
    // useEffect()에서 리턴하는 함수
    // => 뒷정리 함수, clean-up 함수
    // componentWillUnmount와 같은 방식으로 동작(컴포넌트가 언마운트 될때 호출됨)
    return () => {
      clearInterval(timer);
      console.log(`ID ${timer}번 타이머 종료!`);
    };
  }, []);

  return (
    <div>
      <span>⏱타이머가 시작 됐습니다!</span>
    </div>
  );
}

export default Timer;

// 아고다 이런 사이트에서 ~명이 보고있습니다 도 이런식
// 들어올 때 함수에 기록 => 그 사람이 나갈 때 기록 제거 (카운트 - )