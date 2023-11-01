// Redux 설정
// 3. Redux State Slice 만들기

import { createSlice } from "@reduxjs/toolkit";

// state 초기값으로 원시값, 배열, 객체 등 모든 데이터 타입 사용 가능
// 객체를 넣는 것이 상태관리도 쉽고 가독성도 좋음, 값을 하나만 넣더라도 객체가 좋음
const initialState = {
  value: 0
}

// 전역 state 만드는 방법
// useState() 랑 비슷한 역할을 하는데 Redux에서는 state 하나를 slice 라고 부름
// createSlice() 함수: state이름, 초기값 설정, 액션 및 리듀서 함수를 만드는 것을 도와준다.
// 인자값으로 name, initialState, reducers 속성을 같는 객체를 넣음
export const counterSlice = createSlice({
  name: 'counter', // state 이름(추후 action 이름을 만드는데도 쓰임)
  initialState, // state 초기값(위에서 객체 형태로 정의)
  // state를 변경하는 함수(reducer)들을 정의하고 관련 action을 생성
  // 현재 state와 action 객체를 파라미터로 받아오고 필요한 경우 상태를 업데이트하고 새 상태를 반환하는 함수

  reducers: {
    increment: (state) => { // 첫번째 파라미터: 현재 state를 받아옴
      state.value += 1; // 배열 또는 객체의 경우에도 직접 수정하는 형태로 작성 가능!! (툴킷의 장점)
      // 실제로는 상태를 직접 변경하지 않고 내부적으로 state 복사본을 만들어서 그 복사본을 변경하고 새로운 상태를 만들어서 반환 (툴킷의 장점)
      // 가능한 이유? immer 라이브러리가 내장되어 불변성 관리를 해주기 떄문
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => { // 두번째 파라미터: action 객체 = { type: 발생한 액션의 타입, payload: 화물, 전달 데이터 }를 받아옴
      console.log(action);
      state.value += action.payload;

    }
  }
});

// 각 리듀서에 대한 액션 생성 함수들이 객체 형태로 들어있음
// 액션 생성 함수: 해당 액션 객체를 만들어 줌
// 리듀서 만들면 꼭 내보내주기
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 위에서 정의한 리듀서 함수들
export default counterSlice.reducer;

// (정리) 
// 그래서 앞으로 Redux의 state를 변경하려면?
// 1) state 변경 함수(리듀서) 만들기
// 2) 다른데서 사용할 수 있게 export 해줘야함
// 3) 수정을 원할 때 그 함수를 실행해달라고 store에 요청을 해야됨 => dispatch() 함수를 사용하여 store에 액션을 보냄

// 쉽게 이벤트에 비유하자면,
// 이벤트 -> 해당 이벤트 핸들러에서 처리함
// 리덕스에서는 액션 -> 해당 리듀서 에서 state 변경을 처리함