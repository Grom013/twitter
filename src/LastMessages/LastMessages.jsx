import React from 'react';
import './LastMessages.css';

function LastMessages({messages}) {      
    
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
                                                  <img src={message.avatar} alt="" />
                                            </a>
                                            <div className="message-info">
                                                  <div className="message-info-first">
                                                        <div className="post-name">
                                                              <div className="post-main-name">
                                                                    {message.name}k
                                                                    {' '}
                                                                    {message.lastname}
                                                              </div>
                                                              <div className="post-nickname">
                                                                    @
                                                                    {message.nickName}
                                                              </div>
                                                        </div>
                                                        <div className="post-time">
                                                              {/* {timeFn(Math.floor((Date.now() - message.timeMessage) / 60000))} */}
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
