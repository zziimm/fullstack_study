const express = require('express');
const bcrypt = require('bcrypt');

const { client } = require('../database/index');
const passport = require('passport');
const db = client.db('board');

const router = express.Router();

// 회원 기능 만들기(가장 범용적이고 전통적인 session 방식)
// 1) 회원 가입 기능
// 2) 로그인 기능(DB에 있는 데이터와 일치하는지 비교)
// 3) 로그인 성공 시 사용자 정보를 담은 세션 만들기
// 4) 로그인 완료 시 사용자에게 세션 ID가 담긴 쿠키(세션 쿠키)를 보내줌
// -> 브라우저 쿠키 저장소에 저장
// 5) 로그인이 필요한 곳(예: 마이페이지)에서 로그인 여부 확인하고 로그인 상태이면 페이지를 내려줌

// 로그인, 로그아웃을 직접 구현할 수도 있지만
// 세션과 쿠키 처리 등 복잡한 작업이 많으므로 검증된 모듈 사용
// passport 라이브러리, 이름처럼 우리의 서비스를 사용할 수 있게 해주는 여권 같은 역할

// passport 관련 패키지 설치
// npm install passport passport-local
// passport: 회원 인증 메인 라이브러리
// passport-local: 아이디, 이용한 세션 인증 방식으로 회원 인증하는 서브 라이브러리
// (참고)passport 이용 시 JWT, 소셜 로그인 구현도 가능

// GET /user/register 라우터
router.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Quiz: 회원 가입 가능 만들기
// 1) 회원 가입 페이지 만들기
// 2) 서버는 전송받은 아이디, 비번을 회원 user 컬렉션에 저장
// /public/js/register.js 작성
// POST /user/register 라우터 작성

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 회원 가입 예외 처리 추가
    // 기존에 같은 아이디로 가입한 사용자가 있으면 에러 처리
    // username이 이미 DB에 있는지 조회
    const samename = await db.collection('user').findOne({ username });
    if (samename) {
      throw new Error('존재하는 사용자');
      // 같은 역할인지?
      // res.json({
      //   flag: false,
      //   message: '이미 가입된 아이디입니다.'
      // });
      // return;
    } else {
      // 비밀번호를 입력받은대로 저장하기
      // await db.collection('user').insertOne({ username, password });
      
      // 비번을 해싱해서 저장해보기
      // npm i bcrypt 설치 후 가져오기
      // 두번째 인자값: 해싱을 얼마나 복잡하게 할지
      // 숫자가 커질수록 비밀번호를 알아내기가 어려워지만 암호화 시간도 같이 길어짐
      const hash = await bcrypt.hash(password, 12); // 최소 10 이상 추천, 31까지 사용 가능
      await db.collection('user').insertOne({ username, password: hash });
      res.json({
        flag: true,
        message: '성공적으로 가입이 되었습니다.'
      });
    };
  } catch (err) {
    console.error(err);
    res.json({
      flag: false,
      message: err.message
    });
  };
});

// 로그인, 로그아웃 라우터 작성
// GET /user/login
router.get('/login', (req, res) => {
  res.render('login');
});

// POST /user/login
router.post('/login', (req, res, next) => {
  // 전송 받은 아이디, 비번에 DB에 있는지 확인하고 있으면 세션 만들기
  // 이 과정을 직접 만들기보다 paasport의 미들웨어를 이용하여 로컬 로그인 전략을 수행
  passport.authenticate('local', (authError, user, info) => { // 전략이 성공하거나 실패하면 실행될 콜백 함수
    // user: 성공 시 로그인한 사용자 정보
    // info: 실패 시 이유
    if (authError) {
      console.error(authError); // 에러 발생 시 에러가 넘어옴
      return res.status(500).json(authError);
    }
    if (!user) { 
      return res.status(401).json(info.message);
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      res.redirect('/'); // 로그인 완료 시 실행할 코드
    });
  })(req, res, next);
});

module.exports = router;