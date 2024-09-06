import './Post.css'
const Post = ({post}) => {
    return ( 
        <div className="last-messages-post" key={post.id}>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a href="#" className="post-avatar">
                                                  <img src={post.avatar} alt="" />
                                            </a>
                                            <div className="message-info">
                                                  <div className="message-info-first">
                                                        <div className="post-name">
                                                              <div className="post-main-name">
                                                                    {post.name}k
                                                                    {' '}
                                                                    {post.lastname}
                                                              </div>
                                                              <div className="post-nickname">
                                                                    @
                                                                    {post.nickName}
                                                              </div>
                                                        </div>
                                                        <div className="post-time">
                                                              {/* {timeFn(Math.floor((Date.now() - message.timeMessage) / 60000))} */}
                                                        </div>
                                                  </div>
                                                  <div className="message-desc">{post.message}</div>
                                                  {post.img_url && <img className="post-img" src={post.img_url} alt="Post image" />}
                                                  <div className="post-icons">
                                                        <div className="post-repost">
                                                              <img alt="icon1" src="img/repost.svg" />
                                                              <span>{post.repost}</span>
                                                        </div>
                                                        <div className="post-like">
                                                              <img alt="icon2" src="img/like.svg" />
                                                              <span>{post.like}</span>
                                                        </div>
                                                        <div className="post-share">
                                                              <img alt="icon3" src="img/share.svg" />
                                                              <span>{post.share}</span>
                                                        </div>
                                                  </div>
                                            </div>
                                      </div>
     );
}
 
export default Post;