import UserInfo from "./UserInfo";
import Avatar from "./Avatar";
// 댓글 컴포넌트
// 실제 렌더링은 안하고 단순 연습용 예제
function CommentEx(props) {
  console.log(props);
  return (
    <>
      {/* 원본 */}
      <div className="comment">
        <div className="user-info">
          <img className="avatar"
            src={props.author.avatarUrl}
            alt={props.author.name}
            style={{width: 100, borderRadius: 30}}
          />
          <div className="user-info-name">
            {props.author.name}
          </div>
        </div>

        <div className="comment-text">
          {props.text}
        </div>

        <div className="comment-date">
          {props.date}
        </div>
      </div>


      {/* 컴포넌트로 추출한 값 */}
      <div className="comment">
        {/* 2) 사용자 정보를 컴포넌트로 추출 */}
        <UserInfo user={props.author} />

        <div className="comment-text">
          {props.text}
        </div>

        <div className="comment-date">
          {props.date}
        </div>
      </div>
    </>
  );
}

export default CommentEx;