import { useEffect, useState } from "react";
import { fetchPosts } from "../../public/assets/fetchData";
import PostWritter from "../PostWritter/PostWritter";
import PostsFeed from "../LastMessages/PostsFeed";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getPosts();
  }, []); 

  const handleNewPost = async (newMessage, imgUrl) => {
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, imgUrl }), // Отправка данных
      });
  
      if (!response.ok) {
        throw new Error('Сетевая ошибка');
      }
  
      const result = await response.json();
      console.log(result); // Для отладки
  
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="last-messages-wrapper">
      <PostWritter onNewPost={handleNewPost} />
      {error && <div className="error-message">{error}</div>}
      <PostsFeed posts={posts} />
    </div>
  );
}

export default FeedPage;
