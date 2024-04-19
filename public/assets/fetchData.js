export async function fetchData() {
  try {
    const responseTopics = await fetch('http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/topics.json');
    const responseLastMessages = await fetch('http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/lastMessages.json');
    const responseBlogs = await fetch('http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/blogs.json');

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
