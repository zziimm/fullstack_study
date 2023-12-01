const express = require('express');

const { client } = require('../database/index');
const db = client.db('board'); // board 데이터베이스에 연결 (애초에 파일이 없어도 생성되면서 연결됨)

const router = express.Router();

// GET '/' 라우터
router.get('/', (req, res) => {
  res.render('main.ejs');
});

// GET /insert 라우터
// DB에 데이터 저장하기 테스트(테스트 후 데이터 삭제)
router.get('/insert', async (req, res) => {
  try {
    // JS Object 형태로 저장됨
    await db.collection('post').insertOne({ 
      title: '제발 들어가라', 
      content: '들어갔니?' 
    });
    res.send('데이터 저장 완료');
  } catch (err) {
    console.error(err);
  }
});

// Quiz: /time으로 접속하면 현재 서버의 날짜/시간을 보여주는 기능 만들기
// time.ejs로 웹페이지 만들어서 그 안에 서버의 시간을 넣어 보내주면 됨
// 데이터 전달할 때는 객체 형태로
router.get('/time',  (req, res) => {
  const time = new Date();
  res.render('time.ejs', { time })
});

module.exports = router;