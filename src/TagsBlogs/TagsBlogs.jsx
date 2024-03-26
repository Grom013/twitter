import React, { useEffect, useState } from 'react';
import './TagsBlogs.css';
import { fetchData } from '../../public/assets/fetchData.js';

function TagsBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function tagsBlogs() {
      try {
        const data = await fetchData();
        setBlogs(data.blogs);
        setTags(data.topics);
      } catch (error) {
        console.error(error);
      }
    }
    tagsBlogs();
  }, []);
  console.log(tags);
  return (
      <div className="allBlogs">
          <div className="hashtags-bloggers">
              <div className="actual">
                  <div className="hashtags-bloggers-title">Актуальные темы</div>
                  <div className="actual-post" />
                  {tags.map((tag) => (
                      <div className="actual-block" key={tag.id}>
                          <div className="top-name">
                              #
                              {tag.name}
                          </div>
                          <div className="top-message">
                              {tag.messages}
                              сообщений
                          </div>
                      </div>
                  ))}
              </div>
              <div className="bloggers">
                  <div className="hashtags-bloggers-title">Интереные блогеры</div>
                  {blogs.map((blog) => (
                      <div className="bloggers-block">
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
