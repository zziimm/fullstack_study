function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  const count = 0; //falsy 예제

  return (
    <>
      <h1>안읽은 메일 보관함</h1>
      {/* && 연산으로 if문 만들기 */}
      {/* && 연산 뒤의 엘리먼트는 앞의 조건식이 true 일때 출력된다, 조건식이 false면 무시하고 건너뜀 */}
      {/* 조건에 따라 특정 엘리먼트를 나타내거나 숨기고 싶을 때 사용 */}
      {unreadMessages.length > 0 && (
        <>
          <h2>{unreadMessages.length}개의 읽지 않은 메일이 있습니다.</h2>
          {unreadMessages.map((unreadMessages, index) => {
            return <p key={index}>제목: {unreadMessages}</p>;
          })}
        </>
      )}


      {/* 모달창도 같은 원리로 만들 수 있음 showModal이 true면 보여주고 false면 숨기고 등등 */}
      {/* 단축평가에 의해 */}
      {/* {showModal && <Modal />} */}

      {/* 주의! 
        falsy이면 && 뒤에 있는 표현식은 무시하고 건너뛰지만
        falsy 표현식이 반환된다는 것에 주의해야함(falsy 표현식에 따라 화면에 출력될 수도 있음)
      */}
      {false} {/* falsy 예제 */}
      {undefined} {/* falsy 예제 */}
      {null} {/* falsy 예제 */}
      {false && <h1>Messages: {count}</h1> } {/* falsy 예제 => false */}
      {NaN} {/* falsy 예제 => 출력됨 */}
      {count && <h1>Messages: {count}</h1> } {/* falsy 예제 => count = 0 이라서 화면에 0이 출력됨 */}
    </>
  );
}

export default Mailbox;