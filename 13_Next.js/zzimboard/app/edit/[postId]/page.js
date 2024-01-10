import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const postId = props.params.postId;
  const client = await connect;
  const db = await client.db('board');
  const resulte = await db.collection('post').findOne({ _id: new ObjectId(postId) });
  return (
    <div className="p-20">
    <h4>수정하기</h4>
    <form id="edit-form" action="/api/post/edit" method="POST">
      <input type="hidden" name="postId" value={resulte._id.toString()}/>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" name="title" defaultValue={resulte.title}/>
      <label htmlFor="content">내용</label>
      <input type="text" id="content" name="content" defaultValue={resulte.content}/>
      <button type="submit">수정</button>
    </form>
  </div>
  )
}