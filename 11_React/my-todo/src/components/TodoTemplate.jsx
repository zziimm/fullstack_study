import React from 'react';
import { styled } from "styled-components";

const TodoTemplateWrapper = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;

  /* 아래처럼 컴포넌트로 따로 만들어도 되고 아니면 내부에 class로 만들어도 됨 */
  /* 스타일 한두개만 줄거면 클래스 만드는게 좀 깔끔함 */
  /* 굳이 컴포넌트 하나 만드는게 좀 비효율적 */
  /* 아래와 같이 작성하면 자손을 의미 */
  .app-title {
    background: #22b8cf;
    color: white;
    height: 4rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background: white;
  }
`;

// 아래처럼 해도되고 가장 부모에 .~~~하면
// 하위 요소한테 .~~~ 클래스를 준다는 의미
// const AppTitle = styled.div`
//   background: #22b8cf;
//   color: white;
//   height: 4rem;
//   font-size: 1.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// 화면을 가운데 정렬하고, 맵 타이틀을 보여주는 컴포넌트
// children으로 내부 자식 엘리먼트들를 props로 받아와서 렌더링

function TodoTemplate(props) {
  const { children } = props;
  return (
    <TodoTemplateWrapper>
      <div className='app-title'>일정 관리</div>
      <div className='content'>{children}</div>
    </TodoTemplateWrapper>
  );
}


export default TodoTemplate;