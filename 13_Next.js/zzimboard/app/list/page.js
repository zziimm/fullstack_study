import { connect } from "@/database";
import ListItem from "./ListItem";

export default async function List() {
  // (참고) DB 입출력 코드는 server 컴포넌트에서만 쓰기
  const client = await connect;
  const db = await client.db('board');
  const posts = await db.collection('post').find().toArray();

  return (
    <div className="list-bg">
      {/* {posts.map((post) => (
        // ObjectId가 가지고 있는 내장메서드
        <div key={post._id.toString()} className="list-item">
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))} */}
      {/* ListItem 컴포넌트로 추출 */}
      {posts.map((post) => (
        <ListItem 
          key={post._id.toString()}
          title={post.title}
          content={post.content}
          post={post}
        />
      ))}
    </div>
  );
}

//  글 목록 기능 만들기
// 1) /list로 접속 시 글 목록 페이지
// /app/list/page.js
// 2) DB에서 글 목록 가져오기
