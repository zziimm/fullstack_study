function MyButton() {
  const handleDelete = (id) => {
    console.log(`ID: ${id} 삭제됨`);
  };
  return (
    <>
      {/* 컴포넌트가 마운트 될 때 함수가 바로 실행됨 */}
      {/* 이 후 버튼을 눌러도 함수 실행 안됨 */}
      <button onClick={handleDelete(1)}>
        삭제하기(잘못된 방법)
      </button>

      <br />

      {/* 첫번째 매개변수 e로 들어는 값은 event 객체임 */}
      <button onClick={(e) => {
        console.log(e); // 이벤트 객체(발생한 이벤트에 관련한 여러 기능이 담겨있음)
        console.log(e.target); // 현재 발생한 이벤트의 대상 (여기서는 버튼 DOM 객체)
        handleDelete(1);
      }}>
        삭제하기
      </button>
    </>
  );
}

export default MyButton;