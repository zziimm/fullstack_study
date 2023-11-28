const  express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

// dotenv: 환경변수(시스템에 따른 설정값이나 비밀키 등)
// 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 때문
// 1차 보안: 소스코드가 털리면 코드 안에 적어둔 비밀키나 서명 등이 같이 유출됨(하드코딩 지양)
// 2차 보안: .env는 github이나 드라이브(클라우드)에 올리지 않음
dotenv.config(); // 주로 맨 위에 작성(그래야 밑에서 쓸 수 있으니까)


const app = express();

// morgan: 요청과 응답을 기록하는 미들웨어 / 자체적으로 next() 도 실행됨
// 클라이언트에서 어떤 요청이 왔는지 서버에서 어떻게 응답했는지 정보가 서버에 기록됨
// GET / 304 4.810 ms - -
// GET요청 /주소(경로) 응답코드 응답에걸린시간 응답길이(바이트)
app.use(morgan('dev')) // 개발 시 사용
// app.use(morgan('combined')) // 배포 시 사용 - ip주소, 날짜/시간, 브라우저 정보 등 더 자세히 기록됨

// Express 제공 static 미들웨어: static 파일들을 제공하는 미들웨어
// static: 동적인 변동 사항이 없는 정적 파일들(예: css, js, image 등)
// 폴더를 서버에 등록해두면 폴더 안의 정적 파일들을 사용 가능
// app.use('요청 경로', express.static('실제 경로'))
app.use('/', express.static((path.join(__dirname, 'public'))))
// 예: localhost:3000/hello.css 로 요청이 들어오면 -> 실제 위치는 learn-2/public/hello.css

// (참고) 미들웨어끼리 순서 중요(성능적인 문제)
// => 단순히 정적 리소스만 제공하면 되는데 뒤에 위치하면 불필요한 미들웨어들이 실행됨
// 예: 요청에 따라 static 미들웨어의 실행이 달라짐
// localhost:3000/about.png -> public 폴더 안에 해당 파일이 있으면 제공하고 여기서 끝
// localhost:3000/about -> next()가 호출되어 다음 미들웨어 또는 /about 라우터까지 내려감

// cookie-parser: 쿠키 관련 조작들이 편해짐
// app.use(cookieParser([비밀키]));
// 서명(암호화)된 쿠키
// 브라우저에 저장된 쿠키를 해커들이 못쓰게끔 서명을 붙임(근데 모든 쿠키를 서명 하지는 않음)
app.use(cookieParser(process.env.COOKIE_SECRET));

// body-parser: 옛날에는 body-parser를 많이 썼지만 요새는 express에 내장돼서 안씀
// 요청 본문에 담겨오는 데이터가 알아서 파싱됨
// 아래 2개는 거의 필수로 들어가는 설정!!
app.use(express.json()); // 클라이언트에서 json 데이터를 보냈을 때 파싱해서 req.body에 넣어줌
app.use(express.urlencoded({ extended: true }));
// 클라이언트에서 form데이터를 보냈을 때(form을 submit할 때) 파싱해서 req.body에 넣어줌
// extended: 쿼리스트링을 어떻게 처리할지(true면 qs 패키지를, false면 querystring 내장 모듈을 사용)
// true를 추천, qs > querystring 보다 편의 및 강력한 기능 지원
// 다만 FormData로 파일을 보내는 경우 urlencoded()로 처리 못함 => 이 때는 multer 사용

app.set('port', process.env.PORT || 3000);


// express-session: 요청마다 개인의 저장 공간을 만들어주는 세션 관리용 미들웨어
// 직접 만들어 복잘하게 사용하던 세션을 편하게 관리
app.use(session({
  resave: false, // 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 다시 저장할지 여부
  saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 여부
  secret: process.env.COOKIE_SECRET, // 비밀키: 세션 하나 만들 때 세션 문자열(=세션ID)을 암호화해서 보냄
  cookie: { // 세션 쿠키에 대한 설정
    httpOnly: true, // js에서 쿠키에 접근하지 못하게 설정
  },
  name: 'session-cookie', // 세션 쿠키 이름에 대한 설정, 기본값은 'connnect.sid'
}));

// 미들웨어간 데이터 공유 및 전달하기
// 1) app.set은 서버 내내 유지
// 2) req.session은 나에 한해서(같은 세션 안에서) 계속 유지하고 싶은 데이터 => 로그인 유저 정보
// 3) req, res는 요청 하나 동안만 유지(1회성)
app.use((req, res, next) => {
  req.data = '전달 데이터';
  res.locals.data = '데이터 넣기'; // 일반적으로 이렇게 사용 (res에 데이터를 전달해 줄 때)
  next();
});

// multer 설정하기
// 서버 시작할 때 uploads 폴더 만들기
try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// multer 자체가 미들웨어는 아니고 mluter 함수를 호출하면 나오는 객체 안에 4가지 미들웨어가 들어있음
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) { // 어디에 저장할지
      done(null, 'uploads'); // 주의! uploads 폴더가 없으면 업로드 시 에러남
    },
    filename(req, file, done) { // 어떤 이름으로 저장할지
      const ext = path.extname(file.originalname); // 확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); 
      // 파일명 + 날짜/시간 + 확장자
      // 이렇게 하는 이유? 파일 이름이 중복되면 덮어씌우기 때문에
    }
    // done(에러 시 에러값, 성공 시 전달할 값); // 에러 발생 시 에러 처리 미들웨어로
  }), // 하드디스에 저장(실제 서비스 운영 시 서버 디스크 대신에 클라우드 스토리지 서비스에 저장하는게 좋음)
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 사이즈(바이트 단위): 5MB로 제한
});

app.get('/uploads', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'))
});

// multer의 4가지 미들웨어
// 1) 파일을 하나만 업로드하는 경우 single 미들웨어 사용
// => 인자값은 input 태그의 name 속성과 일치해야됨
// app.post('/uploads', upload.single('image'), (req, res) => { // 라우터 미들웨어 전에 장착
//   console.log(req.file); // 업로드 성공 시 정보가 저장됨
//   console.log(req.body); // { title: '' }
//   res.send('ok');
// });

// 2) 여러 파일을 업로드하는 경우 array 미들웨어 사용
// app.post('/uploads', upload.array('image'), (req, res) => {
//   console.log(req.files); // 이 때는 file이 아닌 files임
//   console.log(req.body);
//   res.send('ok');
// });

// 3) 여러 파일(input 태그를 여러 개 사용해서 name이 다른 경우)을 업로드하는 경우 fields 미들웨어 사용
app.post('/uploads', 
  upload.fields([{ name: 'image1' }, { name: 'image2' }]), 
  (req, res) => {
    console.log(req.files.image1); // 이 때는 file이 아닌 files임
    console.log(req.files.image2); // 이 때는 file이 아닌 files임
    console.log(req.body);
    res.send('ok');
  }
);

// 4) 멀티파트로 보내는데 파일을 업로드하지 않았을 때 (잘 안씀)
// app.post('/uploads', upload.none(), (req, res) => {
//   console.log(req.files); // undefined
//   console.log(req.body);
//   res.send('ok');
// });

app.get('/', (req, res) => {
  // 쿠키 사용하기
  // 이전 방식: 임의로 만든 parseCookies() 함수를 사용해서 객체로 변환
  console.log(req.cookies); // 쿠키 문자열이 { mycookie: 'test' } 격체 형태로 알아서 파싱이 되어있음
  console.log(req.signedCookies); // 서명(암호화)된 쿠키

  // 쿠키 설정하기
  // 이전 방식: 'Set-cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
  // 위 문자열 쓴 것을 매서드로 쉽게 사용 가능
  // res.cookie(키, 값, [옵션]);
  res.cookie('name', '천지민', {
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5분 뒤
    httpOnly: true, // js로 쿠키조작을 막는 옵션
    path: '/',
    signed: true, // 서명(암호화) 옵션: 쿠키 귀에 서명이 붙음
    // secure: true, // HTTPS일 경우에만 쿠키가 전송됨
  });

  // 쿠키 지우기
  // res.clearCookie(키, [옵션]); // 옵션을 줄 때는 옵션이 일치해야함
  // res.clearCookie('name', {
  //   httpOnly: true,
  //   path: '/',
  //   signed: true
  // });

  // req.body: 요청 본문에 담겨오는 데이터를 바로 쓸 수 있음
  // console.log(req.body.name); // 나중에 직접 테스트 해볼것!

  // req.session: 요청을 보낸 사용자에 대한 고유 정보
  req.session.name = 'zziimm'; // 세션 등록하면 세션 쿠키는 알아서 내려줌
  // 세션 ID 확인
  // 해당 세션 ID로 세션에 등록된 정보가 없으면 세션 ID는 요청마다 새롭게 생성됨
  console.log(req.session.id);
  console.log(req.sessionID);

  // 전달 데이터 받기
  console.log(req.data);
  console.log(res.locals.data);

  res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send('성공')
});

app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번에서 익스프레스 서버 실행');
});