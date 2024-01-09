import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function detail(props) {
  // Next.js 에서는 params 값이 props로 내려옴
  console.log(props);
  // { params: { postId: '65713726b48548bc09d6e12d' }, searchParams: {} }
  // 같은 형식으로 나옴 / 구조분해할당도 당연히 가능
  const client = await connect;
  const db = client.db('board');
  const post = await db.collection('post').findOne({ _id: new ObjectId(props.params.postId) });
  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>

  )
}