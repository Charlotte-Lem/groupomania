import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';

import { getPost } from '../../Actions/postAction';
import { api } from '../../Utils/api';
import axios from 'axios';
import NavBar from '../Nav/Navbar';

export default function Post(props) {
  const params = useParams(props);
  const postId = params.postId;
  const token = JSON.parse(localStorage.getItem('token'));

  const [currentPost, setCurrentPost] = useState({
    postId: null,
    imagePost: '',
    description: '',
  });

  const [post, setPost] = useState({
    postId: props.id,
    description: props.description,
    imagePost: props.imagePost,
  });
  useEffect(() => {
    getPost(postId)
      .then((response) => {
        setCurrentPost(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [postId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const updateCurrentPost = () => {
    const data = {
      // postId: currentPost.postId,
      description: currentPost.description,
      imagePost: currentPost.imagePost,
    };

    axios
      .put(api + '/api/post/' + postId, data, {
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setCurrentPost({ ...currentPost });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [imagePost, setImagePost] = useState(null);

  const updateImagePost = () => {
    const formData = new FormData();
    formData.append('images', imagePost);
    // formData.append('userId', userId);

    axios
      .put(api + '/api/post/' + postId, formData, {
        headers: {
          Authorization: 'Bearer ' + token.token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setImagePost();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <NavBar />
      {currentPost ? (
        <div className="content-edit">
          <form className="form-edit" onSubmit={updateCurrentPost}>
            <div className="post-content__edit">
              <label className="post-edit__label" htmlFor="description">
                Votre post :
              </label>
              <input
                type="text"
                className="description-post__form"
                id="description"
                name="description"
                placeholder="Ecrivez un nouveau titre ici..."
                value={currentPost.description}
                onChange={handleInputChange}
                aria-label="Ecrivez un nouveau titre ici"
              />
            </div>
            <button
              aria-label="modifier le titre du post"
              className="input__btn"
              type="submit"
            >
              Validez
            </button>
          </form>
          <div className="post-content">
            {currentPost.imagePost ? (
              <img
                className="img-post"
                alt="post"
                src={currentPost.imagePost}
              ></img>
            ) : null}
          </div>

          <form className="form-edit" onSubmit={updateImagePost}>
            <label htmlFor="file" className="label-file">
              <BiUpload className="icon-post" />
              Trouvez une autre image
            </label>
            <input
              id="file"
              className="input-file"
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              name="images"
              onChange={(e) => setImagePost(e.target.files[0])}
            ></input>
            <button
              aria-label="envoyer une nouvelle image du post"
              className="input__btn"
              type="submit"
            >
              Validez
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <div className="back">
        <Link
          className="btn-post__link"
          aria-label="retour au fil d'actualités "
          to={`/`}
        >
          Retournez aux actus
        </Link>
      </div>
    </div>
  );
}
