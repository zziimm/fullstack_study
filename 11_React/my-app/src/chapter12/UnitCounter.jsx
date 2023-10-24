import React from 'react';
import { useState } from 'react';

function UnitCounter(props) {
  const {length, onLengthChange} = props;

  // 1. Local State 실습
  // 만약 UnitCounter 컴퍼넌트 안에서 state를 정의했다면 컴포넌트마다 각각 개별적인 상태를 갖게 됨
  // const [localLength, setLocalLength] = useState(1);
  return (
    <>
      {/* Local State */}
      {/* <button onClick={() => setLocalLength(Math.max(localLength - 1, 0))}>-</button>
      {localLength}
      <button onClick={() => setLocalLength(localLength + 1)}>+</button> */}

      {/* Shared State */}
      <button onClick={() => onLengthChange(Math.max(length - 1, 0))}>-</button>
      {length}
      <button onClick={() => onLengthChange(length + 1)}>+</button>
    </>
  );
}

export default UnitCounter;