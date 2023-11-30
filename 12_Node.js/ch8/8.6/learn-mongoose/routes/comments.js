const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment
    });
    console.log(comment); // 생성된 댓글 데이터
    const result = await Comment.populate(comment, { path: 'commenter' });
    // commenter의 ObjectId로 참조하는 실제 사용자 객체로 바꿔줌
    // 댓글 등록 시 Network > Preview나 Response에서 확인
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  
});

// put: 전체 수정 , patch: 부분 수정
router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Comment.updateOne({ // 조건 입력, 수정 대상
      _id: req.params.id
    }, { // 어떻게 수정할지, 수정 내용
      // $set: {comment: req.body.comment},  // 몽고디비 네이티브 라이브러리일 때 이렇게 써야함 $set 필요함(안쓰면 데이터를 통째로 바꿈)
      comment: req.body.comment // 몽구스에선 $set을 안붙여도 comment 필드만 바뀜
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Comment.deleteOne({
      _id: req.params.id
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
