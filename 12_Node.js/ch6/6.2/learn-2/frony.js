document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const name2 = e.target.username2.value;
  const name3 = e.target.username3.value;
  try {
    await axios.post('/login', { name, name2, name3 }); // name: name
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
});