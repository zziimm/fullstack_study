const express = require('express');

const router = express.Router();


router.get('/notice', (req, res) => {
  res.send('공지사항 게시판');
});
router.get('/qna', (req, res) => {
  res.send('문의 게시판');
});

module.exports = router;
