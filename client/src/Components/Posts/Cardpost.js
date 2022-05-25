import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import pictureProfile from '../../Assets/defaultUserPicture.png';
import {
  deletePost,
  deleteComment,
  commentPost,
} from '../../Actions/postAction';

import Comment from './Comment';

import { api } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPencil,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

//permet de mettre la date sur post et commentaires en FR
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function Cardpost(props) {
  // log props
  const dispatch = useDispatch();
  const [toggleCmt, setToggleCmt] = useState(false);
  // const [posts, setPost] = useState([]);
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
        // console.log('ALL POST ', response.data);
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
        // console.log('ALL COMMENT ', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token.token]);
  // useEffect(() => {
  //   allComment();
  // }, []);
  const [message, setMessage] = useState('');

  const handleComment = async () => {
    try {
      const response = await axios.post(
        api + `/api/comment/${id}`,
        { message, postPostId: props.id },
        {
          headers: {
            Authorization: 'Bearer ' + token.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('COMMENTAIRE CREE', response);
      window.location.reload();
      return response.data;
    } catch (error) {
      console.log(error.message);
      return false;
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
    <div className="|">
      <li className="container-cards" id={props.id}>
        <div className="card-container">
          <div className="profil-post ">
            {props.picture ? (
              <img
                className="pic-post"
                alt="img profil"
                src={props.picture}
              ></img>
            ) : (
              <img className="pic-post" src={pictureProfile} alt="" />
            )}
            <p className=" firstname-post "> {props.firstname}</p>
            <p className=" lastname-post"> {props.lastname}</p>
          </div>
          <div className="post-content">
            <p className="description-post">{props.description}</p>
            {props.imagePost ? (
              <img className="img-post" alt="post" src={props.imagePost}></img>
            ) : null}
          </div>
          <p className="date-post">{moment(props.createdAt).format('LLL')}</p>
          <div className="btn-content">
            {token.userId === props.userId || token.admin ? (
              <div className="post-btn-content">
                <Link className="btn-post" to={`/${props.id}`}>
                  <FontAwesomeIcon icon={faPencil} />
                </Link>
                <button
                  type="button"
                  className="btn-post"
                  onClick={(e) => e.preventDefault(handleDeletePost(props.id))}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ) : null}
          </div>
          <form className="comment-container__comment-form">
            <input
              className="comment-container__comment-input"
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez un commentaire..."
            />
            <button
              onClick={(e) =>
                e.preventDefault(handleComment(props.id, comment.message))
              }
              className="comment-container__btn-comment"
            >
              {' '}
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
          <button
            onClick={() => setToggleCmt(!toggleCmt)}
            className="toggle-comment"
          >
            {toggleCmt
              ? 'Cacher les commentaires'
              : `Voir les commentaires (${countComment(props.id)})`}
          </button>
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
        </div>
      </li>
    </div>
  );
}
