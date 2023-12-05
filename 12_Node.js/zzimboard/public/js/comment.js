document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const comment = e.target.comment.value;
  const postId = e.target.postId.value;
  await axios.post('/post/comment', { comment, postId })
});