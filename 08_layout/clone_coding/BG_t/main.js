const langBtn = document.querySelector('.btn_language > button')
const lang = document.querySelector('.dropdown_inner0');
langBtn.addEventListener('click',function () {
  let hasActive = lang.classList.contains('active');
  console.log(hasActive);
  if (hasActive) {
    lang.classList.remove('active');
  } else {
    lang.classList.add('active');
  }
});