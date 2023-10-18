import Comment from "./Comment";

const comments = [
  {
    name: '천지민',
    content: '안녕하세요. 반갑습니다.'
  },
  {
    name: '김지민',
    content: '안녕하세요.'
  },
  {
    name: '이지민',
    content: '으갸갸갹'
  },
  {
    name: '박지민',
    content: '안녕안녕안녕안녕안녕안녕'
  }
];

// 댓글들을 포함하는 컴포넌트
function CommentList(props) {
  return (
    <div>
      {/* Quiz: props를 추가하여 name과 content 값 전달 */}
      {/* <Comment name="천지민" content="으갸갸갸"/>
      <Comment name="만지민" content="으갸"/>
      <Comment name="백지민" content="으갸개개개객갸갸"/> */}

      {/* 배열을 동적으로 랜더링해야 할 때에는 배열의 map() 함수를 사용
      (map(): 배열 안에 있는 각 요소를 이용하여 새로운 배열을 만듦)
      일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 만들면 됨 */}
      {comments.map((comment, index) => {
        return (
          <Comment key={index} name={comment.name} content={comment.content}/>
        );
      })}

      {/* map() 함수의 결과 */}
      {[
        <Comment key={0} name='천지민' content='안녕하세요. 반갑습니다.'/>,
        <Comment key={1} name='김지민' content='안녕하세요.'/>,
        <Comment key={2} name='이지민' content='으갸갸갹'/>,
        <Comment key={3} name='박지민' content='안녕안녕안녕안녕안녕안녕'/>
      ]}

      {/* 코드 단축 시 */}
      {comments.map((comment, index) => <Comment key={index} name={comment.name} content={comment.content} />)}
    </div>
  );
}

export default CommentList;