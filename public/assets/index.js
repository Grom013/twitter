const closeModal = document.querySelectorAll('.close');
const openModal = document.querySelector('.btn-reg');
const mod = document.querySelector('.regModal');

closeModal.forEach((element) => {
  element.addEventListener('click', () => {
    mod.style.display = 'none';
  });
});

openModal.addEventListener('click', () => {
  mod.style.display = 'block';
});

window.addEventListener('click', (event) => {
  if (event.target === mod) {
    mod.style.display = 'none';
  }
});
