import Link from "next/link";
import DetailButton from "./DetailButton";

export default function ListItem(props) {
  return (
    <div className="list-item">
      {/* 페이지를 이동하는 방법(1) - Link 컴포넌트 */}
      {/* Link 컴포넌트를 사용하여 '/detail/글id로 이동 */}
      <h4>
        <Link href={`/detail/${props.post._id.toString()}`}>
          {props.title}
        </Link>
      </h4>

      {/* 페이지를 이동하는 방법(2) - useRouter */}
      <DetailButton postId={props.post._id.toString()} />

      <p>{props.content}</p>
    </div>
  )
}

// 상세 페이지 만들기
// 1) 글 제목 누르면 상세 페이지로 이동
// 2) DB 에서 해당 게시글 가져와서 보여주기
// => 이때 상세페이지 URL은? ex)  /detail/123
// => /app/detail 폴더 안에 여러 폴더 만들면 비효율적
// => React: URL 파라미터, Express: 라우트 파라미터 :id 
// => Next.js: Dynamic Routes사용 -> 파일 또는 폴더 이름을 대괄호로 묶어 생성 []