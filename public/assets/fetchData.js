export async function fetchData() {
  try {
    const responseTopics = await fetch('/topics');
    const responseLastMessages = await fetch('/lastMessages');
    const responseBlogs = await fetch('/blogs');

    if (!responseTopics.ok || !responseLastMessages.ok || !responseBlogs.ok) {
      throw new Error('Network error');
    }

    const topicsData = await responseTopics.json();
    const lastMessagesData = await responseLastMessages.json();
    const blogsData = await responseBlogs.json();

    return { topics: topicsData, lastMessages: lastMessagesData, blogs: blogsData };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function fetchPictures() {
  try {
    const response = await fetch('/public/pictures.json');
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
