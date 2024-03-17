import mail from './mail.js';
import { fetchData, fetchPictures } from './fetchData.js';
import timeFn from './time.js';

const closeModal = document.querySelectorAll('.close');
const openModal = document.querySelector('.btn-reg');
const mod = document.querySelector('.regModal');
const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const nameInputDanger = document.querySelector('.name-input-danger');
const emailInputDanger = document.querySelector('.email-input-danger');
const passwordInputDanger = document.querySelector('.password-input-danger');
const confirmPasswordInputDanger = document.querySelector('.confirm-password-input-danger');
const emailAddressInputDanger = document.querySelector('.email-address-input-danger');
const usersElement = document.getElementById('users');
const todayMessagesElement = document.getElementById('todayMessages');
const allMessagesElement = document.getElementById('allMessages');

function updatePostTime() {
  const postTimeElements = document.querySelectorAll('.post-time');
  postTimeElements.forEach((element) => {
    const { time } = element.dataset;
    const minutesAgo = timeFn(Math.floor((Date.now() - Number(time)) / 60000));
    element.textContent = `${minutesAgo}`;
  });
}

// Вызываем функцию обновления времени каждую минуту
setInterval(updatePostTime, 60000);
function displayMessages(messages, pictures) {
  const messageContainer = document.querySelector('.last-messages');
  if (!messageContainer) return;

  let messagesHtml = '';
  messages.forEach((message) => {
    const picture = pictures.find((pic) => pic.id === message.id);
    const pictureUrl = picture ? picture.avatarUrl : '';

    messagesHtml += `
      <div class="last-messages-post">
        <a class="post-avatar"><img src="${pictureUrl}" alt=""/></a>
        <div class="message-info">
          <div class="message-info-first">
            <div class="post-name">
              <div class="post-main-name">${message.name} ${message.lastname}</div>
              <div class="post-nickname">@${message.nickName}</div>
            </div>
            <div class="post-time"  data-time="${message.timeMessage}"></div>
          </div>
          <div class="message-desc">${message.message}</div>
            ${message.img ? `<img class="posts-img" src="${message.img}" alt="" />` : ''}
          <div class="post-icons">
            <div class="post-repost"><img alt="icon1" src="img/repost.svg"/> ${message.repost}</div>
            <div class="post-like"><img alt="icon2" src="img/like.svg"/> ${message.like}</div>
            <div class="post-share"><img alt="icon3" src="img/share.svg"/> ${message.share}</div>
          </div>
        </div>
      </div>
      <div class="border-post"></div>
      <div class="whitening"></div>
    `;
  });

  messageContainer.innerHTML = messagesHtml;
  updatePostTime();
}

function displayTopics(topics) {
  const topicsContainer = document.querySelector('.actual-post');
  let topicsHtml = '';
  topics.forEach((topic) => {
    topicsHtml += `
      <div dataId="${topic.id}">
      <div class="top-name">#${topic.name}</div>
      <div class="top-message" style="margin-bottom: 10px;">${topic.messages} сообщений</div>
</div>
      `;
    topicsContainer.innerHTML = topicsHtml;
  });
}
function displayBlogs(blogs) {
  const blogContainer = document.querySelector('.bloggers-block');
  let blogHtml = '';
  blogs.forEach((blog) => {
    blogHtml += `
      <div style="display: flex;justify-content: space-between;margin-top: 10px;">
      <div><img src="${blog.img}" alt=""/></div>
        <div class="bloggers-name">
            <div>${blog.name}</div>
            <div class="bloggers-nickname">${blog.nickname}</div>
        </div>
        <button class="bloggers-btn">Читать</button>
      </div>
      `;
  });
  blogContainer.innerHTML = blogHtml;
}

async function view() {
  try {
    const data = await fetchData();
    const pictures = await fetchPictures();
    usersElement.textContent = data.static.users;
    allMessagesElement.textContent = data.static.allMessages;
    todayMessagesElement.textContent = data.static.todayMessages;

    if (data && pictures) {
      displayMessages(data.lastMessages, pictures.pictures);
    }
    if (data) {
      displayTopics(data.topics);
    }
    if (data && pictures) {
      displayBlogs(data.blogs);
    }
  } catch (error) {
    console.error('Error', error);
  }
}

view();

submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  if (!mail(email)) {
    emailInput.classList.remove('input-field');
    emailInput.classList.add('red-field');
    emailAddressInputDanger.style.display = 'block';
  } else {
    emailAddressInputDanger.style.display = 'none';
  }
  if (name === '') {
    nameInput.classList.remove('input-field');
    nameInput.classList.add('red-field');
    nameInputDanger.style.display = 'block';
  }
  if (password === '') {
    passwordInput.classList.remove('input-field');
    passwordInput.classList.add('red-field');
    passwordInputDanger.style.display = 'block';
  }
  if (confirmPassword === '') {
    confirmPasswordInput.classList.remove('input-field');
    confirmPasswordInput.classList.add('red-field');
  }
  if (confirmPassword !== password) {
    confirmPasswordInput.classList.remove('input-field');
    confirmPasswordInput.classList.add('red-field');
    confirmPasswordInputDanger.style.display = 'block';
  } else {
    confirmPasswordInput.classList.remove('red-field');
    confirmPasswordInput.classList.add('input-field');
    confirmPasswordInputDanger.style.display = 'none';
  }

  nameInput.addEventListener('input', () => {
    if (!name.length < 0) {
      nameInput.classList.add('red-field');
      nameInput.classList.remove('input-field');
      nameInputDanger.style.display = 'block';
    } else {
      nameInput.classList.add('input-field');
      nameInput.classList.remove('red-field');
      nameInputDanger.style.display = 'none';
    }
  });
  emailInput.addEventListener('input', () => {
    if (!email.length < 0) {
      emailInput.classList.add('red-field');
      emailInput.classList.remove('input-field');
      emailInputDanger.style.display = 'block';
    } else {
      emailInput.classList.add('input-field');
      emailInput.classList.remove('red-field');
      emailInputDanger.style.display = 'none';
    }
  });
  passwordInput.addEventListener('input', () => {
    if (!password.length < 0) {
      passwordInput.classList.add('red-field');
      passwordInput.classList.remove('input-field');
      passwordInputDanger.style.display = 'block';
    } else {
      passwordInput.classList.add('input-field');
      passwordInput.classList.remove('red-field');
      passwordInputDanger.style.display = 'none';
    }
  });
});

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
