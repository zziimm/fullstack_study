const express = require('express');

const { client } = require('../database/index');
const db = client.db('board'); // board 데이터베이스에 연결 (애초에 파일이 없어도 생성되면서 연결됨)

const router = express.Router();

// 글 목록 기능 만들기
// GET /post 라우터
router.get('/', async (req, res) => {
  const posts = await db.collection('post').find({}).toArray(); // 컬렉션의 모든 document를 출력하는 법
  console.log(posts);

  // 글 목록 페이지 만들어서 웹페이지에 서버(DB) 데이터 꽂아 넣기 => 템플릿 엔진 사용
  // res.render('list');

  // 서버 데이터를 ejs 파일에 넣으려면
  // 1) ejs 파일로 데이터 전달
  // 2) ejs 파일 안에서 <%= 데이터 %>
  // 3) ejs 문법으로 HTML 안에서도 JS 사용하려면 <% 자바스크립트 코드%>
  res.render('list', { posts });

});


module.exports = router;