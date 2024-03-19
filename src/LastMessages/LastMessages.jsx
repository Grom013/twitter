import React, { useEffect, useState } from 'react';
import './LastMessages.css';
import { fetchData, fetchPictures } from '../../public/assets/fetchData.js';
import timeFn from '../../public/assets/time.js';

function LastMessages() {
  const [messages, setMessages] = useState([]);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    let intervalId;

    async function getData() {
      try {
        const data = await fetchData();
        const pictur = await fetchPictures();
        setMessages(data.lastMessages.map((message) => ({
          ...message,
          originalTimeMessage: message.timeMessage, // сохраняем начальное время сообщения
        })));
        setPictures(pictur.pictures);
      } catch (error) {
        console.error('Error occurred while fetching data:', error);
      }
    }

    getData();

    intervalId = setInterval(() => {
      setMessages((prevMessages) => prevMessages.map((message) => ({
        ...message,
        timeMessage: Date.now() - message.originalTimeMessage, // обновляем относительное время
      })));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  function getAvatarUrl(messageId) {
    const picture = pictures.find((pic) => pic.id === messageId);
    return picture ? picture.avatarUrl : '';
  }

  return (
      <div>
          {messages.length > 0 ? (
              <div>
                  <div className="last-messages-title">Последние сообщения</div>
                  <div className="last-messages">
                      {messages.map((message) => (
                          <div className="last-messages-post" key={message.id}>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a href="#" className="post-avatar">
                                  <img src={getAvatarUrl(message.id)} alt="" />
                              </a>
                              <div className="message-info">
                                  <div className="message-info-first">
                                      <div className="post-name">
                                          <div className="post-main-name">
                                              {message.name}
                                              {' '}
                                              {message.lastname}
                                          </div>
                                          <div className="post-nickname">
                                              @
                                              {message.nickName}
                                          </div>
                                      </div>
                                      <div className="post-time">
                                          {timeFn(Math.floor((Date.now() - message.timeMessage) / 60000))}
                                      </div>
                                  </div>
                                  <div className="message-desc">{message.message}</div>
                                  {message.img && <img className="posts-img" src={message.img} alt="" />}
                                  <div className="post-icons">
                                      <div className="post-repost">
                                          <img alt="icon1" src="img/repost.svg" />
                                          <span>{message.repost}</span>
                                      </div>
                                      <div className="post-like">
                                          <img alt="icon2" src="img/like.svg" />
                                          <span>{message.like}</span>
                                      </div>
                                      <div className="post-share">
                                          <img alt="icon3" src="img/share.svg" />
                                          <span>{message.share}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                      <div className="border-post" />
                      <div className="whitening" />
                  </div>
              </div>
          ) : (
              <div className="skeleton-main">
                  <div className="last-messages-title">Последние сообщения</div>
                  <div className="skeleton-block">
                      <div className="skeleton-block1">
                          <div className="skeleton-img" />
                          <div>
                              <div className="skeleton-block1-desk1" />
                              <div className="skeleton-block1-desk2" />
                          </div>
                      </div>
                      <div className="skeleton-block2">
                          <div className="skeleton-block2-desc1" />
                          <div className="skeleton-block2-desc2" />
                      </div>
                  </div>
                  <div className="skeleton-block">
                      <div className="skeleton-block1">
                          <div className="skeleton-img" />
                          <div>
                              <div className="skeleton-block1-desk1" />
                              <div className="skeleton-block1-desk2" />
                          </div>
                      </div>
                      <div className="skeleton-block2">
                          <div className="skeleton-block2-desc1" />
                          <div className="skeleton-block2-desc2" />
                      </div>
                  </div>
                  <div className="skeleton-block">
                      <div className="skeleton-block1">
                          <div className="skeleton-img" />
                          <div>
                              <div className="skeleton-block1-desk1" />
                              <div className="skeleton-block1-desk2" />
                          </div>
                      </div>
                      <div className="skeleton-block2">
                          <div className="skeleton-block2-desc1" />
                          <div className="skeleton-block2-desc2" />
                      </div>
                  </div>

              </div>
          )}
      </div>
  );
}

export default LastMessages;
