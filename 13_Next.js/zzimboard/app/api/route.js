export async function GET(req) { // GET 요청 라우터
  console.log('GET /api 라우터');

  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return Response.json({ data });
}

export async function POST(req) { // POST 요청 라우터 (이런식으로 만들면 됨)
}


// 경로 결정 시 주의 사항
// 같은 경로에 page.js와 route.js가 동시에 존재해서는 안됨!
// Page                Route             Result
// app/page.js         app/route.js      Conflict => '/'로 GET 요청을 보내면 둘 다 받을수 있음
// app/page.js         app/api/route.js  Valid
// app/[user]/page.js  app/api/route.js  Valid

// 참고 자료: https://nextjs.org/docs/app/building-your-application/routing/route-handlers