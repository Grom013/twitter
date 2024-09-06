import { useState } from "react";
import './PostWritter.css';
import postSize from "../../public/assets/post-size";
import { Widget } from '@uploadcare/react-widget';

function PostWritter({ onNewPost }) {
  const [post, setPost] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [widgetKey, setWidgetKey] = useState(0); 

  const onChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.length === 0) return;

    try {
      await onNewPost(post, imgUrl);
      setPost('');
      setImgUrl(''); 
      setWidgetKey(prevKey => prevKey + 1); 
      setServerMessage('Сообщение отправлено успешно');
    } catch (error) {
      setServerMessage('Ошибка при отправке сообщения');
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleFileUpload = (fileInfo) => {
    setImgUrl(fileInfo.cdnUrl);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-post"
          type="text"
          placeholder="Что нового?"
          value={post}
          onChange={onChange}
        />
        <div className="input-container">
          <div className="post-text">{post}</div>
          <div className="send-block">
            <Widget
              key={widgetKey} 
              publicKey={"d812eace09e33c827d3a"}
              onChange={handleFileUpload}
            />
            <div className="submit-block">
              <div className="circle"><span>{post ? postSize(post) : null}</span></div>
              <button className="subm-btn" type="submit">Отправить</button>
            </div>
          </div>
        </div>
      </form>
      {showMessage && <div className="server-message">{serverMessage}</div>}
    </div>
  );
}

export default PostWritter;
