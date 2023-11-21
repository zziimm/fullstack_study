const fs = require('fs').promises

// 파일 생성
// 인자값: 만들 파일의 경로와 파일명, 파일에 작성할 내용
fs.writeFile('./writheme.txt', '글이 입력됩니다.')
  .then(() => {
    return fs.readFile('./writheme.txt'); // 파일을 만든 후 바로 읽기
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch(err => console.error(err))


async function file() {
  try {
    await fs.writeFile('./writheme.txt', '글이 입력됩니다.');
    const res2 = await fs.readFile('./writheme.txt');
    console.log(res2.toString());
  } catch (error) {
    console.log(error);
  }
}
file();