import React from 'react';
import { useState } from 'react';

// 하위(자식) 엘리먼트를 감사서 카드 형태로 보여주는 범용적인 컴포넌트
function Card(props) {
  const { title, backgroundcolor, children } = props;
  const [com, setCom] = useState('');
  

  const handleCom = (e) => {
    setCom(e.target.value);
  };




  return (
    <>
      <div style={{
        margin: 8,
        padding: 8,
        borderRadius: 8,
        boxShadow: '0px 0px 4px gray',
        backgroundColor: backgroundcolor || 'lightgray',
        // backgroundcolor에 falsy 값이 들어오면 기본값으로 lightgray를 사용
      }}>
        {/* 조건부 렌더링 */}
        {title && 
          <h1 style={{ borderBottom: '1px solid gray' }}>{title}</h1>
        }
        {children}
      </div>

      <div style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 20,
        }}>
        <input type="text" value={com} onChange={handleCom}/>
        <button>버튼</button>
      </div>
    </>
  );
}

export default Card;