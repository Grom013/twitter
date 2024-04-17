import React, { useEffect, useState } from 'react';
import './TagsBlogs.css';
import { fetchData } from '../../public/assets/fetchData.js';

function TagsBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    async function fetchDataAndSetState() {
      try {
        const data = await fetchData();
        setBlogs(data.blogs);
        setTags(data.topics);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataAndSetState();
  }, []);
console.log(tags.topics);
  return (
    <div className="allBlogs">
      <div className="hashtags-bloggers">
        <div className="actual">
          <div className="hashtags-bloggers-title">Актуальные темы</div>
          <div className="actual-post" />
          
        </div>
        <div className="bloggers">
          <div className="hashtags-bloggers-title">Интересные блогеры</div>
          {blogs && blogs.map((blog, index) => ( // Обратите внимание на изменения здесь
            <div className="bloggers-block" key={index}> {/* Изменено на использование индекса */}
              <div><img src={blog.img} alt="" /></div>
              <div className="bloggers-name">
                <div>{blog.name}</div>
                <div className="bloggers-nickname">{blog.nickname}</div>
              </div>
              <button className="bloggers-btn">Читать</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagsBlogs;
