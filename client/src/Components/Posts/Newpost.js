import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from '../../Actions/postAction';
import { BiUpload } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export default function Newpost(props) {
  // const token = JSON.parse(localStorage.getItem('token'));

  const dispatch = useDispatch();

  const [post, setPost] = useState({
    description: '',
    imagePost: '',
    userId: '',
  });

  const handleSubmit = () => {
    if (!post.description && !post.imagePost) {
      alert('Votre post est vide');
    } else {
      async function awaitPost() {
        const result = await newPost(
          post.description,
          post.imagePost,
          post.userId
        );
        if (!result) {
          console.log('erreur');
        } else {
          dispatch({
            type: 'NEW_POST',
            payload: post,
          });
          setPost({
            description: '',
            imagePost: null,
          });
        }
      }
      window.location.reload(false);
      awaitPost();
    }
  };

  const handleInput = (e) => {
    if (e.target.id === 'publish-description') {
      setPost({
        ...post,
        description: e.target.value,
      });
    }
    if (e.target.id === 'file') {
      setPost({
        ...post,
        imagePost: e.target.files[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-post" key={props.postId}>
      <div className="title-post">Créer une publication</div>
      <input
        value={post.description}
        onChange={handleInput}
        id="publish-description"
      ></input>
      <br />
      <label htmlFor="file" className="label-file">
        <BiUpload className="icon-post" />
        Choisir une image
      </label>
      <input
        type="file"
        className="input-file"
        id="file"
        accept="images/*"
        onChange={handleInput}
      />

      <button type="button" onClick={handleSubmit} className="publish-post">
     
        <FontAwesomeIcon icon={faShare} />
      </button>
    </form>
  );
}
