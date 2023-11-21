// fs 모듈: 파일 시스템에 접근하는 모듈
// 브라우저에서는 접근이 안되는데 노드에서는 가능
// 파일/폴더 생성, 삭제, 읽기, 쓰기 가능

// 콜백 방식 대신 프로미스 방식으로 사용 가능(fs 모듈 자체적으로 지원함)
const fs = require('fs').promises;

// 파일 읽기
// 인자값: 파일 경로, 파일을 읽었을 때 실행할 콜백 함수
fs.readFile('./readme.txt')
  .then(file => console.log(file.toString()))
  .catch(err => console.error(err))

async function file() {
  try {
    const resFile = await fs.readFile('./readme.txt')
    console.log(resFile.toString());
  } catch (error) {
    console.error(error);
  }
}
file();