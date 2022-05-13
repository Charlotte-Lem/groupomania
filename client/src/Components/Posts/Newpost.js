import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from '../../Actions/postAction';
import axios from 'axios';
import { api } from '../../Utils/api';
//import { getUser } from '../../Actions/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export default function Newpost() {
  const token = JSON.parse(localStorage.getItem('token'));
  //const id = JSON.parse(localStorage.getItem('token')).userId;
  // const { postArray, userInfo } = useSelector((state) => ({
  //   ...state.postReducer,
  //   ...state.userReducer,
  // }));
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    description: '',
    imagePost: '',
    userId: '',
  });

  useEffect(() => {
    axios
      .get(api + '/api/user/' + token.userId, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        console.log('USER CONNECTED', response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleSubmit = () => {
    async function awaitPost() {
      newPost(post.description, post.imagePost, post.userId);
      dispatch({
        type: 'NEW_POST',
        payload: post,
      });
      setPost({
        description: '',
        imagePost: null,
      });
    }
    window.location.reload(false);
    awaitPost();
  };

  const handleInput = (e) => {
    if (e.target.id === 'publish-description') {
      setPost({
        ...post,
        description: e.target.value,
      });
    }
    if (e.target.id === 'imagePost') {
      setPost({
        ...post,
        imagePost: e.target.files[0],
      });
    }
  };

  // const changeFile = (e) => {
  //   setPost({
  //     ...post,
  //     imagePost: e.target.files[0],
  //   }); // stockage du fichier charger dans un state Image
  // };
  // console.log(token.userId);
  return (
    <form onSubmit={handleSubmit} className="edit-post">
      <div className="title-post">Créer une publication</div>
      <textarea
        value={post.description}
        onChange={handleInput}
        id="publish-description"
      ></textarea>
      <br />
      <label htmlFor="imagePost" className="htmlFor">
        <input
          type="file"
          className="btn-load-img"
          id="imagePost"
          accept="images/*"
          onChange={handleInput}
        />
      </label>
      <button type="button" onClick={handleSubmit} className="publish-post">
        <FontAwesomeIcon icon={faShare} />
      </button>
    </form>
  );
}
