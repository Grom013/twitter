export async function fetchData() {
  try {
    const responseTopics = fetch('http://localhost:3000/topics.json');
    const responseLastMessages = fetch('http://localhost:3000/lastMessages.json');
    const responseBlogs = fetch('http://localhost:3000/blogs.json');

    const [topicsResponse, lastMessagesResponse, blogsResponse] = await Promise.all([
      responseTopics,
      responseLastMessages,
      responseBlogs,
    ]);

    if (!topicsResponse.ok || !lastMessagesResponse.ok || !blogsResponse.ok) {
      throw new Error('Network error');

    }
    const topicsData = await topicsResponse.json();
    const lastMessagesData = await lastMessagesResponse.json();
    const blogsData = await blogsResponse.json();

    return { topics: topicsData, lastMessages: lastMessagesData, blogs: blogsData };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function fetchPictures() {
  try {
    const response = await fetch('/pictures.json');
    if (!response.ok) {
      throw new Error('error network');
    }
    const pictures = await response.json();
    console.log(pictures);
    return pictures;
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}
