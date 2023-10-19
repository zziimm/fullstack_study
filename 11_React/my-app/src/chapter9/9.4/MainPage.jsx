import { useState } from "react";

const styles = {
  button: {
    height: 40,
    width: 200,
  },
  warning: {
    backgroundColor: 'red',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    fontSize: '14pt',
    color: 'white',
  }
};

// props 값으로 받아서 처리하는 방식
function WarningBanner(props) {
  console.log(props.warn);
  if (!props.warn) {    // false 값이 오면 여기서 함수 정지 후 아무 값도 반환하지 않음
    return null;
  }
  return (
    <div style={styles.warning}>Waring!</div>
  );
}

// 조건부 렌더링으로 처리하는 방식
function DangerBanner() {
  return (
    <div style={styles.warning}>Danger!</div>
  );
}



function MainPage() {
  const [showWarning, setShowWarning] = useState(false);

  const handleToggle = () => {
    // setShowWarning(!showWarning);
    setShowWarning(prevState => !prevState); // 인자값은 바꿀 수 있음
  };

  return (
    <>
      <WarningBanner warn={showWarning} /> {/* false가 오면 null을 반환함 */}

      {/* 보통의 경우 아래와 같이 조건부 렌더링으로 처리하는 것도 가능 */}
      {/* 논리연산자, 삼항연산자 사용가능 => 이 예제에선 논리연산자가 더 깔끔함 */}
      {/* 모달, 툴바 예시로도 사용가능 */}
      {showWarning && <DangerBanner />}

      <button style={styles.button} onClick={handleToggle}>
        {showWarning ? '감추기' : '보이기'}
      </button>
    </>
  );
}

export default MainPage;