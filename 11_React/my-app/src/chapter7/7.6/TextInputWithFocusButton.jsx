import { useEffect } from "react";
import { useRef } from "react";

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  console.log(inputEl); // 래퍼런스 객체라 부르는 자바스크립트 일반 객체를 반환함

  useEffect(() => {
    // 마운트 됐을때(렌더링 이후에) 실행되므로 input 엘리먼트가 나옴
    console.log(inputEl);

    // 활용 예: 로그인이나 회원가입 화면이 처음 보여졌을때
    // 굳이 클릭하지 않아도 자동으로 포커스가 되어있게 하려면
    // useEffect + uesRef 사용 useEffect=화면 다 불러오고 실행할 것들 /  uesRef=강제로 DOM에 접근할 때 ex. 강제 포커스
    // 사용자 편의를 위해 넣어주는 것도 ㄱㅊ
    inputEl.current.focus();
  });

  const onButtonClick = () => {
    // 여기서 inputEl.current는 text input 객체를 담고 있음
    inputEl.current.focus(); // 실제 input에 접근하여 강제 focus
  };

  return (
    <>
      {/* ref 속성에 inputEl을 넣어주기만 하면 해당 DOM에 접근 가능 */}
      {/* 마치 document.querySelector()와 같음 */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;