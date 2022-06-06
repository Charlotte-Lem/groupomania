import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { api } from '../../Utils/api';
import { deletePost } from '../../Actions/postAction';
import Like from './Like';
import Comment from './Comment';

import pictureProfile from '../../Assets/defaultUserPicture.png';
import {
  FaRegCommentDots,
  FaRegTrashAlt,
  FaPencilAlt,
  FaRegPaperPlane,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

//permet de mettre la date sur post et commentaires en FR
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function Cardpost(props) {
  const dispatch = useDispatch();
  const [toggleCmt, setToggleCmt] = useState(false);
  const [post, setPost] = useState({
    postId: props.id,
    description: props.description,
    imagePost: props.imagePost,
  });

  const { commentArray, postArray, userInfo } = useSelector((state) => ({
    ...state.commentReducer,
    ...state.postReducer,
    ...state.userReducer,
  }));

  const token = JSON.parse(localStorage.getItem('token'));
  const id = JSON.parse(localStorage.getItem('token')).userId;
  useEffect(() => {
    axios
      .get(api + '/api/post/', {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token.token]);

  /*---------------*/
  //RECUPERE TOUS LES COMM
  const [comment, setComment] = useState({
    User: userInfo,
    message: '',
    postPostId: props.id,
  });
  useEffect(() => {
    axios
      .get(api + `/api/comment`, {
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setComment(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token.token]);

  const [message, setMessage] = useState('');

  const handleComment = async () => {
    if (!message) {
      alert('Votre commentaire est vide');
    } else {
      await axios
        .post(
          api + `/api/comment/${id}`,
          { message, postPostId: props.id },
          {
            headers: {
              Authorization: 'Bearer ' + token.token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
        .then(
          (response) => console.log('COMMENTAIRE CREE', response),
          window.location.reload()
        )
        .catch((error) => console.log(error));
    }
  };

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

  //fonction pour compter les commentaires de chaque post
  const countComment = (postid) => {
    let newArray = commentArray;
    let filterArray = newArray.filter((i) => {
      return i.postPostId === postid;
    });
    return filterArray.length;
  };

  return (
    <ul className="container-cards ">
      <li className="container-cards card" id={props.id}>
        <article className="card-container">
          <div className="profil-post ">
            {props.picture ? (
              <img
                className="pic-post"
                alt="image de profil"
                src={props.picture}
              ></img>
            ) : (
              <img
                className="pic-post"
                src={pictureProfile}
                alt="image de profil"
              />
            )}
            <p className=" firstname-post "> {props.firstname}</p>
            <p className=" lastname-post"> {props.lastname}</p>
          </div>
          <div className="header-post">
            <p className="date-post">{moment(props.createdAt).format('LLL')}</p>
            <h3 className="description-post">{props.description}</h3>
          </div>
          <div className="post-content">
            {props.imagePost ? (
              <img
                className="img-post"
                alt="image du post"
                src={props.imagePost}
              ></img>
            ) : null}
          </div>

          <div className="utils-post"></div>
          <div className="btn-content">
            {token.userId === props.userId || token.admin ? (
              <div className="post-btn-content">
                <Link
                  className="btn-post"
                  aria-label="lien vers le post"
                  to={`/post/${props.id}`}
                >
                  <FaPencilAlt className="post-btn__ icon-pencil" />
                </Link>
                <button
                  type="button"
                  className="btn-post"
                  aria-label="Suppression du post"
                  onClick={(e) => e.preventDefault(handleDeletePost(props.id))}
                >
                  <FaRegTrashAlt className="post-btn__ icon-trash" />
                </button>
              </div>
            ) : null}
          </div>
          <form className="comment-container__comment-form">
            <input
              className="comment-container__comment-input"
              type="text"
              id={comment.id}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Écrivez un commentaire..."
              aria-label="ecrire un commentaire"
            />
            <label htmlFor="message" hidden>
              Écrivez un commentaire
            </label>
            <button
              aria-label="envoyer le commentaire"
              onClick={(e) =>
                e.preventDefault(handleComment(props.id, comment.message))
              }
              className="comment-container__btn-comment"
            >
              {' '}
              <FaRegPaperPlane className="comment-container__icon-plane" />
            </button>
          </form>
          <div className="post-like_com">
            <Like userId={props.userId} postPostId={props.id} />

            <button
              aria-label="afficher les commentaires"
              onClick={() => setToggleCmt(!toggleCmt)}
              className="toggle-comment"
            >
              {toggleCmt ? (
                <div className="toggle-comment__count">
                  <FaRegCommentDots className="toggle-comment__icon" />
                  <p>{countComment(props.id)}</p>
                </div>
              ) : (
                <div className="toggle-comment__count">
                  <FaRegCommentDots className="toggle-comment__icon" />
                  <h4>{countComment(props.id)}</h4>
                </div>
              )}
            </button>
          </div>
          {toggleCmt &&
            commentArray.map((comment) =>
              comment.postPostId === props.id ? (
                <Comment
                  key={comment.commentId}
                  id={comment.commentId}
                  postPostId={comment.postPostId}
                  createdAt={comment.createdAt}
                  message={comment.message}
                  userId={comment.userId}
                  firstname={comment['user.firstName']}
                  lastname={comment['user.lastName']}
                  picture={comment['user.profilePicture']}
                />
              ) : (
                ''
              )
            )}
        </article>
      </li>
    </ul>
  );
}
