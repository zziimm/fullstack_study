const express = require('express');

const router = express.Router();

router.get('/sub/notice', (req, res) => {
  res.send('공지사항 게시판');
});
router.get('/sub/qna/:num', (req, res) => {
  res.send(`문의 게시판 ${req.params.num}번`);
});

module.exports = router;