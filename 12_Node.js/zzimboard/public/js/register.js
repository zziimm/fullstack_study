document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  // if (!e.target.username.value) {
  //   return alert('아이디를 입력하세요.');
  // } else if (!e.target.password.value) {
  //   return alert('비밀번호를 입력하세요');
  // }
  try {
    const result = await axios.post('/user/register', { username: e.target.username.value, password: e.target.password.value });
    console.log(result);
    if (!result.data.flag) {
      alert(result.data.message);
      return;
    } else {
      alert(result.data.message);
      location.href = '/';
    };
    e.target.username.value;
    e.target.password.value;
  } catch (err) {
    console.error(err);
  }
});