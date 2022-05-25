import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getPost } from '../../Actions/postAction';
import { api } from '../../Utils/api';
import axios from 'axios';
import NavBar from '../Nav/Navbar';

export default function Post(props) {
  const params = useParams(props);
  const navigate = useNavigate();
  const postId = params.postId;
  console.log(' POSTID', postId);
  const token = JSON.parse(localStorage.getItem('token'));
  const id = JSON.parse(localStorage.getItem('token')).userId;
  // const postState = {
  //   postId: null,
  //   imagePost: '',
  //   description: '',
  // };
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
  console.log(postId);
  useEffect(() => {
    getPost(postId)
      .then((response) => {
        setCurrentPost(response);
        console.log(response);
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
      .then((response) => {
        setCurrentPost({ ...currentPost });
        console.log(response.data);
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
      .then((response) => {
        setImagePost();
        console.log(response);
        // navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const back = () => {
    navigate('/');
  };
  return (
    <div>
      <NavBar />
      {currentPost ? (
        <div className="content-edit">
          <form className="form-edit" onSubmit={updateCurrentPost}>
            <div className="post-content__edit">
              <label className="post-edit__label" htmlFor="description">
                Titre :{' '}
              </label>

              <input
                type="text"
                className="description-post__form"
                id="description"
                name="description"
                value={currentPost.description}
                onChange={handleInputChange}
              />
            </div>{' '}
            <button className="input__btn" type="submit">
              Changer le titre
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
          {/* <form onSubmit={''}> */}
          <form className="form-edit" onSubmit={updateImagePost}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              name="images"
              // value={currentPost.imagePost}
              onChange={(e) => setImagePost(e.target.files[0])}
            ></input>
            <button className="input__btn" type="submit">
              Changer la photo
            </button>
            <Link className="btn-post __link" to={`/`}>
              Retournez aux actus
            </Link>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
