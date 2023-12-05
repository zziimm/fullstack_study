document.getElementById('write-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!title) {
    return alert('제목을 입력하세요');
  }
  try {
    const formData = new FormData();
    formData.append('img', e.target.img.files[0]);
    formData.append('title', e.target.title.value);
    formData.append('content', e.target.content.value);
    formData.append('author', e.target.author.value);
    const result = await axios.post('/post/write', formData);
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