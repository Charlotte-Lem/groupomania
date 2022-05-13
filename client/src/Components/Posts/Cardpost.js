import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import userReducer from '../../Redux/Reducer/postReducer';
import url from '../../Utils/urlApi';
import axios from 'axios';
import pictureProfile from '../../Assets/defaultUserPicture.png';
import { deletePost, updatePost, allComment } from '../../Actions/postAction';
import Comment from './Comment';
import { api } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faHeart } from '@fortawesome/free-solid-svg-icons';
//import { post } from '../../../../Groupomania/routes/post.routes';

export default function Cardpost() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const token = JSON.parse(localStorage.getItem('token'));
  const [updateMode, setupdateMode] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === 'update') {
      setupdateMode(true);
    } else {
      setupdateMode(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${url}post`, {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then((response) => {
        setPosts(response.data);
        console.log('ALL POST ', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token.token]);

  /*---------------*/
  //RECUPERE TOUS LES COMM
  useEffect(() => {
    allComment();
  });

  const handleDeletePost = (postId) => {
    async function awaitDeletePost() {
      const result = await deletePost(postId);
      if (!result) {
        console.log('erreur DELETE POST');
      } else {
        dispatch({
          type: 'DELETE_POST',
          payload: postId,
        });
        console.log(postId + ' delete');
      }
    }
    awaitDeletePost();
    window.location.reload();
  };
  //attention à l'auth pour ne plus supp les posts des autres
  const handlePostUpdate = (postId) => {
    axios
      .put(api + '/api/post/' + postId, {
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('UPDATE DU POST ', response);
      })
      .catch((error) => {
        console.error('ERROR UPDATE', error);
      });
  };

  const handleLikePost = () => {
    console.log('Like post');
  };
  const handleDeleteComm = () => {
    console.log('DELETE COMM');
  };

  return (
    <>
      <ul className="container-cards">
        {posts.map((item) => {
          return (
            <li
              className="card-container"
              key={item.postId}
              id={item.postId}
              date={item.createdAt}
              //  authorname={item.user}
              userid={item.userId}
              // imagePost={item.imagePost}
              // description={item.description}
            >
              <div className="profil-post ">
                {item['user.profilePicture'] ? (
                  <img
                    className="pic-post"
                    alt="img profil"
                    src={item['user.profilePicture']}
                  ></img>
                ) : (
                  <img className="pic-post" src={pictureProfile} alt="" />
                )}

                <p className=" firstname-post "> {item['user.firstName']}</p>
                <p className=" lastname-post"> {item['user.lastName']}</p>
              </div>
              <div className="post-content">
                <p className="description-post">{item.description}</p>
                {item.imagePost ? (
                  <img
                    className="img-post"
                    alt="post"
                    src={item.imagePost}
                  ></img>
                ) : null}
              </div>

              <div className="btn-content">
                <div className="like">
                  <p className="like__p-like">J'aime : </p>
                  <button
                    type="button"
                    className="btn-heart
                      "
                    onClick={(e) =>
                      e.preventDefault(handleLikePost(item.postId))
                    }
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>

                {token.userId === item.userId ? (
                  <div className="post-btn-content">
                    <button
                      type="button"
                      className="btn-post"
                      onClick={(e) =>
                        e.preventDefault(handleDeletePost(item.postId))
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn-post"
                      id="update"
                      onClick={handleModals['item.postId']}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="comment-content">
                <Comment postId={item.postId} />
              </div>
              {item.comments?.reverse().map((dataItem) => {
                return (
                  <div
                    key={dataItem.commentId}
                    className="comment-content__cont"
                  >
                    <div className="comment-content__nav">
                      {dataItem['user.profilePicture'] ? (
                        <img
                          className="comment-content__pic-post"
                          alt="img profil"
                          src={dataItem['user.profilePicture']}
                        ></img>
                      ) : (
                        <img
                          className="comment-content__pic-post"
                          src={pictureProfile}
                          alt=""
                        />
                      )}
                      <p className=" firstname-post ">
                        {dataItem['user.firstName']}
                      </p>
                      <p className=" lastname-post">
                        {dataItem['user.lastName']}
                      </p>
                    </div>
                    <div className=" comment-content__comment-cont">
                      <p className=" comment-content__comment-message">
                        {dataItem.message}
                      </p>
                    </div>

                    {token.userId === dataItem.userId ? (
                      <div>
                        <button
                          type="button"
                          className="btn-comm"
                          onClick={(e) =>
                            e.preventDefault(
                              handleDeleteComm(dataItem.commentId)
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </>
  );
}
