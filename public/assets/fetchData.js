import fetch from 'node-fetch';

export async function fetchData() {
  try {
    const [topicsResponse, lastMessagesResponse, blogsResponse] = await Promise.all([
      fetch('http://localhost:3000/topics.json'),
      fetch('http://localhost:3000/lastMessages.json'),
      fetch('http://localhost:3000/blogs.json'),
    ]);

    if (!topicsResponse.ok || !lastMessagesResponse.ok || !blogsResponse.ok) {
      throw new Error('Ошибка сети');
    }

    const [topicsData, lastMessagesData, blogsData] = await Promise.all([
      topicsResponse.json(),
      lastMessagesResponse.json(),
      blogsResponse.json(),
    ]);

    return { topics: topicsData, lastMessages: lastMessagesData, blogs: blogsData };
  } catch (error) {
    console.error('Ошибка:', error);
    return null;
  }
}

export async function fetchPictures() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch('/public/pictures.json');
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }

    const pictures = await response.json();
    return pictures;
  } catch (error) {
    console.error('Ошибка', error);
    return null;
  }
}
