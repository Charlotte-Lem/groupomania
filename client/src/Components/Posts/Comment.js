import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import pictureProfile from '../../Assets/defaultUserPicture.png';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ImPencil2 } from 'react-icons/im';

import { deleteComment, editCmt } from '../../Actions/postAction';
//fontawesome icone import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPencil,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

export default function Comment(props) {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('token'));
  const [toggle, setToggle] = useState(false);
  const [comment, setComment] = useState({
    commentId: props.id,
    postPostId: props.postid,
    message: props.message,
    userId: props.userId,
    User: props.user,
  });
  const { commentArray } = useSelector((state) => ({
    ...state.commentReducer,
  }));

  // fonction pour supprimer un commentaire
  const handleDeleteComm = (commentid) => {
    async function awaitDelComment() {
      const result = await deleteComment(commentid);
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'DELETE_CMT',
          payload: commentid,
        });
      }
    }
    awaitDelComment();
    window.location.reload();
  };
  
  const handleInput = (e) => {
    if (e.target.id === 'edit-cmt') {
      setComment({
        ...comment,
        message: e.target.value,
      });
    }
  };
  //fonction pour edit d'un commentaire
  const editComment = (commentid) => {
    // fonction pour commentaire
    async function awaitEditComment() {
      const result = await editCmt(commentid, comment.message);
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'EDIT_CMT',
          payload: comment,
        });
      }
    }
    awaitEditComment();
    window.location.reload();
  };

  // toggle pour affichage de l'edit d'un commentaire
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="comment-content__cont">
      <div className="comment-content__nav">
        {props.picture ? (
          <img
            className="comment-content__pic-post"
            alt="img profil"
            src={props.picture}
          ></img>
        ) : (
          <img
            className="comment-content__pic-post"
            src={pictureProfile}
            alt="img profil"
          />
        )}

        <p className="comment-date">{moment(props.createdAt).format('lll')}</p>
        <div className="comment__edit">
          {token.userId === props.userId || token.admin ? (
            <>
              <div className="edit-btn__comment">
                <button
                  aria-label="Modifier votre commentaire"
                  onClick={(e) => e.preventDefault(handleToggle())}
                  className="comment__edit__btn-edit"
                >
                  <ImPencil2 className="comment__edit__btn-edit__pencil" />
                </button>
                <button
                  aria-label="Supprimer votre commentaire"
                  onClick={(e) => e.preventDefault(handleDeleteComm(props.id))}
                  className="comment__edit__btn-edit"
                >
                  <FaRegTrashAlt className="comment__edit__btn-edit__trash" />
                </button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      {/* si le toggle est actif alors on affiche les champs d'édition de commentaire */}
      {toggle ? (
        <div className="cmtcmt">
          <label htmlFor="edit-cmt"></label>
          <input
            onChange={handleInput}
            value={comment.message}
            className="cmt"
            type="text"
            id="edit-cmt"
          />
          <button
            aria-label="envoyer le commentaire modifié"
            onClick={(e) => e.preventDefault(editComment(props.id))}
            className="cmt"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      ) : (
        <p className="cmt message">{props.message}</p>
      )}
    </div>
  );
}
