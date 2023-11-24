const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// 문자열로 된 쿠키를 객체로 바꿔주는 함수
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => { // acc는 이전 값 , 초기값이 {} 니까 k: v 로 들어감
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {}; // 데이터 저장용 세션 객체 생성

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
      const url = new URL(req.url, 'http://localhost:8084');
      const name = url.searchParams.get('name');
      const expires = new Date();
      // 쿠키 유효 시간을 현재시간 +5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);

      // 세선 사용하기
      const uniqueInt = Date.now(); // 세션 키(세션 ID) 만들기: 현재 시간 (고유한 값)을 사용해 임의로 생성
      session[uniqueInt] = {
        name,
        expires
      }; // 서버 메모리에 세션 저장
  
      console.log(name); // 한글 일 때 encodeURIComponent로 인코딩 안하면 쿠키에 이상한 문자가 들어갔다고 에러 발생
      res.writeHead(302, { // 302: 리다이렉션
        location: '/', // 이 주소로 돌려보내라
        'Set-cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
      }); // 브라우저에는 고유한 키 값만 보내서 쿠키에 저장(응답 헤더에 쿠키 부분 확인해보기)
      res.end();
    // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    } else if (cookies.session && session[cookies.session]?.expires > new Date()) { // 만료되면 쿠키에서 제거되겠지만 한번 더 엄격하게 검사 // ? = 옵셔널 체이닝 
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${session[cookies.session].name}님 안녕하세요!`);
    } else {
      try {
        const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(error.message);
      }
    }
})
  .listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다!');
  });

// 개념 이해를 돕기 위한 간단한 예제이므로 실제론 보안상 문제가 있음
// 실제 서버에서는 세션을 직접 구현하지 않음
// 추후 6장에서 실무에서 세션을 어떻게 쓰는지(express-session) 다시 다룰 예정

// 여기까지 서버를 만들면서
// 노드에서 제공하는 방식(http 모듈)으로는 서버 코드가 너무 복잡하고, 유지 보수하기도 힘듦
// 코드를 깔끔하고 유지 보수하기 편하게 해주는 Express 프레임워크를 사용할 예정