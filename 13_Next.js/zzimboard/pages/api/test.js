import { connect } from "@/database";

export default async function handler(req, res) {


  // query string 확인
  console.log(req.query);

  res.status(200).json({ message: '하위!' });

  // GET/POST 요청에 따라 다른 코드를 실행하고 싶으면?
  // if문 또는 switch문 사용
  if (req.method === 'POST') {
    
  } 
}