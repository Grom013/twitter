import { useEffect, useState } from "react";
import { fetchPosts } from "../../public/assets/fetchData";
import LastMessages from "../LastMessages/LastMessages";
import PostWritter from "../PostWritter/PostWritter";

function FeedPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getPosts();
  }, []); 

  const handleNewPost = async (newMessage) => {
    try {
      await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const updatedMessages = await fetchPosts();
      setMessages(updatedMessages);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="last-messages-wrapper">
      <PostWritter onNewPost={handleNewPost} />
      {error && <div className="error-message">{error}</div>}
      <LastMessages messages={messages} />
    </div>
  );
}

export default FeedPage;
