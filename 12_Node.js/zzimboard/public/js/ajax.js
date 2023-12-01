document.getElementById('write-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!title) {
    return alert('제목을 입력하세요');
  }
  try {
    const result = await axios.post('/post/write', { title: e.target.title.value, content: e.target.content.value });
    console.log(result.data);

    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = '/post'
  } catch (err) {
    console.error(err);
  }
  e.target.title.value = '';
  e.target.content.value = '';
});