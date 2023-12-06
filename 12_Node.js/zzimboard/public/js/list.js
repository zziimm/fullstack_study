// 글 삭제 시
// querySelectorAll 로 다 가져와서 forEach로 하나하나한테 기능을 준다
document.querySelectorAll('.delete').forEach((deleteBtn, index) => {
  deleteBtn.addEventListener('click', async (e) => {
    try {
      const result = await axios.delete(`/post/${e.target.dataset.id}`);
      console.log(result.data);

      if (result.status === 200) {
        e.target.parentElement.parentElement.remove();

      } else {
        alert(result.data.message);
      }
      // 왜 새로고침을 해야 삭제된 결과가 반영되는지?
      // => 삭제 성공 시 HTML도 제거하는 코드 작성 (CSR방식) 깔끔하긴 함

      // => 아니면 /post로 요청을 보내서 새롭게 글 목록을 받아옴(SSR) 지울 때마다 화면 깜빡
      // location.href = '/post'

      // 리액트에서는? state를 변경하면 됨


    } catch (err) {
      console.error(err);
    }
  });
});


// (참고) HTML 보여주는 법(2가지)
// 1) 서버에서 다 만들어서 보내기(SSR)
// 2) 서버는 데이터만 보내고 브라우저에서 완성하기(CSR)
// Ajax를 쓰면 서버가 보낸 데이터만 받아 JS로 HTML을 동적으로 만들어서 현재 페이지에 CSR 구현 가능

document.querySelector('.search-btn').addEventListener('click', async () => {
  const keyword = document.querySelector('.search').value;
  // 주소창을 사용해서 GET 요청 보내기
  location.href = `/post/search?keyword=${keyword}`;
});