import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import userReducer from '../../Redux/Reducer/postReducer';
import axios from 'axios';
import pictureProfile from '../../Assets/defaultUserPicture.png';
import {
  deletePost,
  updatePost,
  allComment,
  deleteComment,
  likePost,
} from '../../Actions/postAction';
import Comment from './Comment';
import { api } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Cardpost() {
  const dispatch = useDispatch();
  const [toggleCmt, setToggleCmt] = useState(false);
  const [posts, setPosts] = useState([]);
  const { commentArray, postArray, userInfo } = useSelector((state) => ({
    ...state.commentReducer,
    ...state.postReducer,
    ...state.userReducer,
  }));

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get(api + '/api/post/', {
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
  }, []);

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
  // const handleLikePost = (postId, value) => {
  //   async function awaitLike() {
  //     const result = await likePost(postId, value);
  //     if (result === false) {
  //       console.log('erreur');
  //     } else {
  //       let newArr = JSON.parse(posts.userLike);
  //       let object = {
  //         like: value,
  //         postId: postId,
  //         countLike: result,
  //         userId: token.userId,
  //       };
  //       if (value === 1) {
  //         newArr.push(token.userId);
  //         setPosts({
  //           ...posts,
  //           countLike: result + 1,
  //           userLike: JSON.stringify(newArr),
  //         });
  //         console.log(posts);
  //         dispatch({
  //           type: 'LIKE',
  //           payload: object,
  //         });
  //       } else {
  //         let findIndex = newArr.findIndex((p) => p === token.userId);
  //         newArr.splice(findIndex, 1);
  //         setPosts({
  //           ...posts,
  //           countLike: result - 1,
  //           userLike: JSON.stringify(newArr),
  //         });
  //         console.log(posts);
  //         dispatch({
  //           type: 'DISLIKE',
  //           payload: object,
  //         });
  //       }
  //     }
  //   }
  //   awaitLike();
  // };
  // const handleLikePost = () => {
  //   console.log('Like post');
  // };
  // const [comment, setComment] = useState();

  const handleDeleteComm = (commentId) => {
    async function awaitDeleteComment() {
      const result = await deleteComment(commentId);
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'DELETE_CMT',
          payload: commentId,
        });
      }
    }
    awaitDeleteComment();
    window.location.reload();
  };
  const countCmt = (postId) => {
    let newArray = commentArray;
    let filterArray = newArray.filter((i) => {
      return i.postId === postId;
    });
    return filterArray.length;
  };

  //

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
              description={item.description}
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
                {token.userId === item.userId || token.admin ? (
                  <div className="post-btn-content">
                    <Link className="btn-post" to={`/actus/${item.postId}`}>
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                    <button
                      type="button"
                      className="btn-post"
                      onClick={(e) =>
                        e.preventDefault(handleDeletePost(item.postId))
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="comment-content">
                <Comment postId={item.postId} />
              </div>

              <button
                onClick={() => setToggleCmt(!toggleCmt)}
                className="toggle_comment"
              >
                {toggleCmt
                  ? 'Cacher les commentaires'
                  : `Les commentaires c\'est ici`}
                {/* {toggleCmt
                  ? 'Cacher les commentaires'
                  : `Les commentaires c\'est ici (${countCmt(posts.postId)})`} */}
              </button>

              {toggleCmt &&
                item.comments?.map((dataItem) => {
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
                            alt="img profil"
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

                      {token.userId === dataItem.userId || token.admin ? (
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
