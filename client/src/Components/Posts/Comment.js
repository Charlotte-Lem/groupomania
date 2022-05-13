import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../Utils/api';
// import { commentPost } from '../../Actions/postAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
export default function Comment(props) {
  const token = JSON.parse(localStorage.getItem('token'));

  const id = JSON.parse(localStorage.getItem('token')).userId;
  const [message, setMessage] = useState('');

  const handleComment = async () => {
    console.log('commentaire');
    try {
      const response = await axios.post(
        api + `/api/comment/${id}`,
        { message, postPostId: props.postId, userId: props.userId },
        {
          headers: {
            Authorization: 'Bearer ' + token.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('COMMENTAIRE CREE', response);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <div className="comment-container">
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
          onClick={handleComment}
          className="comment-container__btn-comment"
        > <FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
}
