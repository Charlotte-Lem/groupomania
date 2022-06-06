import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newPost } from '../../Actions/postAction';
import { BiUpload } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';

export default function Newpost(props) {

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
      <h2 className="title-post">Créer une publication</h2>

      <input
        value={post.description}
        onChange={handleInput}
        id="publish-description"
        aria-label="votre texte ici"
      ></input>

      <br />
      <label htmlFor="file" className="label-file">
        <BiUpload className="icon-post" />
        Choisir une image
        <input
          type="file"
          className="input-file"
          id="file"
          accept="images/*"
          onChange={handleInput}
          aria-label="choisir une image pour un post"
        />
      </label>

      <button
        aria-label="envoyer un post modifié"
        type="button"
        onClick={handleSubmit}
        className="publish-post"
      >
        <FaShare className='edit-post__icon-share' />
      </button>
    </form>
  );
}
