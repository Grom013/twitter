import React from 'react';
import './PostsFeed.css';
import Post from '../Post/Post';

function PostsFeed({posts}) {      
    
  return (
        <div>
              {posts.length > 0 ? (
                    <div>
                          <div className="last-messages-title">Последние сообщения</div>
                          <div className="last-messages">
                                {posts.map((post) => (
                                      <Post post={post}/>
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

export default PostsFeed;
