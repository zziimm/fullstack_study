const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

// 서버단에서 json형태로 보내주는 방법을 REST API 형식이라고함
router.get('/', async (req, res, next) => {
  try {
    // (참고) 데이터가 많아지면 많아질수록 느려짐(이럴때는 10개 100개씩 끊어서 가져온다던지 조금씩 조회하면됨)
    const users = await User.find({}); // 전체 찾기
    res.json(users); // 데이터를 찾아서 json으로 보내줌
  } catch (err) {
    next(err);
  }
});

// 이런 형식 하나하나가 API임
router.post('/', async (req, res, next) => {
  try {
    // 생성하기: 몽고디비에선 insertOne, 몽구스에선 create
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    // 데이터를 찾은 다음에 바로 이어서 populate 사용
    // 사용자의 댓글들 가져올 때 commenter 부분의 ObjectId를 실제 사용자 객체로 바꿔줌
    // 댓글 보기 시 Network > Preview나 Response에서 확인
    console.log(comments);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;