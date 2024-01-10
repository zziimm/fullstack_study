export default function handler(req, res) {
  console.log('/api/test/[id].js');

  // URL 파라미터 확인
  console.log(req.query);

  res.json({ message: '키키키' })




  // 삭제
  if (req.method === 'DELETE') {
    // const postId = req.params.postId
    await db.collection('post').deteleOne({});

    res.redirect(302, '/list'); // 응답코드 생략 시 기본값: 307(Temporary)  

  }





}