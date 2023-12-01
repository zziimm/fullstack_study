document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const result = await axios.patch(`/post/${e.target.id.value}`, { title: e.target.title.value, content: e.target.content.value });
    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = '/post'
  } catch (err) {
    console.error(err);
  }
});