import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import pictureProfile from '../../Assets/defaultUserPicture.png';

import { deleteComment, editCmt } from '../../Actions/postAction';
//fontawesome icone import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPencil,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

export default function Comment(props) {
  console.log('PROPS COMMENT ', props);
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
  // const handleDeleteComm = (commentId) => {
  //   async function awaitDeleteComment() {
  //     const result = await deleteComment(commentId);
  //     if (!result) {
  //       console.log('erreur');
  //     } else {
  //       dispatch({
  //         type: 'DELETE_CMT',
  //         payload: commentId,
  //       });
  //     }
  //   }
  //   awaitDeleteComment();
  //   window.location.reload();
  // };
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
    // fonction editer commentaire
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
                  onClick={(e) => e.preventDefault(handleToggle())}
                  className="comment-container__btn-edit"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  onClick={(e) => e.preventDefault(handleDeleteComm(props.id))}
                  className="comment-container__btn-edit"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>

      {toggle ? ( // si le toggle est actif alors on affiche les champs d'édition de commentaire
        <div className="cmtcmt">
          <label htmlFor="edit-cmt"></label>
          <input
            onChange={handleInput}
            value={comment.message}
            className="cmt1"
            type="text"
            id="edit-cmt"
          />
          <button
            onClick={(e) => e.preventDefault(editComment(props.id))}
            className="cmt"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      ) : (
        <p className="cmt2">
          {/*sinon on affiche tout simplement le message du commentaire*/}
          {props.message}
        </p>
      )}
    </div>
  );
}
//   const token = JSON.parse(localStorage.getItem('token'));

//   const id = JSON.parse(localStorage.getItem('token')).userId;
//   const [message, setMessage] = useState('');

//   const handleComment = async () => {
//     console.log('commentaire');
//     try {
//       const response = await axios.post(
//         api + `/api/comment/${id}`,
//         { message, postPostId: props.postId, userId: props.userId },
//         {
//           headers: {
//             Authorization: 'Bearer ' + token.token,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('COMMENTAIRE CREE', response);
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//       return false;
//     }
//   };

//   return (
//     <div className="comment-container">
//       <form className="comment-container__comment-form">
//         <input
//           className="comment-container__comment-input"
//           type="text"
//           id="message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Écrivez un commentaire..."
//         />
//         <button
//           onClick={handleComment}
//           className="comment-container__btn-comment"
//         > <FontAwesomeIcon icon={faPaperPlane} /></button>
//       </form>
//     </div>
//   );
// }
