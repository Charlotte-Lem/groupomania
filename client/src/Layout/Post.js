import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import ArticleService from '../../services/article.service';
import { getPost } from '../Actions/postAction';
import { api } from '../Utils/api';
import axios from 'axios';

export default function Post(props) {
  const navigate = useNavigate();
  //   navigate('/actus');
  // const { id } = props.match.params
  const params = useParams(props);
  const postId = params.postId;
  console.log(' POSTID', postId);
  const token = JSON.parse(localStorage.getItem('token'));

  const postState = {
    postId: null,
    imagePost: '',
    description: '',
  };
  const [currentPost, setCurrentPost] = useState(postState);
  console.log('poststate', postState);

  const getOnePost = () => {
    getPost(params.postId)
      .then((response) => {
        setCurrentPost(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOnePost(params.postId);
  }, [params.postId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const updateCurrentPost = (e) => {
    const data = {
      postId: currentPost.postId,
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
    routeChange();
  };

  const routeChange = () => {
    navigate('/actus');
  };
  //   const updateArticle = () => {
  //     ArticleService.update(currentPost.id, currentPost)
  //       .then((response) => {
  //         console.log(response.data);
  //         setMessage('The post was updated successfully!');
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  return (
    <div>
      {currentPost ? (
        <div className="container-cards __edit">
          <form onSubmit={updateCurrentPost}>
            <div className="post-content">
              <label htmlFor="description">Titre : </label>
              <input
                type="text"
                className="description-post form"
                id="description"
                name="description"
                value={currentPost.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="post-content">
              {currentPost.imagePost ? (
                <img
                  className="img-post"
                  alt="post"
                  src={currentPost.imagePost}
                ></img>
              ) : null}
            </div>
            <button>Validez les changements</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
