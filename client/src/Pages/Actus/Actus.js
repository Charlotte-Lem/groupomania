import React from 'react';
import NavBar from '../../Components/Navbar/Navbar';
import Cardpost from '../../Components/Cardpost/Cardpost';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPost } from '../../Services/postServices';
import Newpost from '../../Components/NewPost/Newpost';

export default function Actus() {
  //trouver et afficher tous les posts
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('token')).token;
  const userId = token.userId;

  // const [allPosts, setAllPosts] = useState([]);
  const { postArray, userInfo } = useSelector((state) => ({
    ...state.postReducer,
    ...state.userReducer,
  }));

  useEffect(() => {
    async function getPublications() {
      const result = await getPost();
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'GETPOST',
          payload: result,
        });
      }
    }
    getPublications();
  }, []);

  console.log(postArray);

  return (
    <>
      <NavBar />
      <Newpost />
      <div className="container-cards">
        {postArray.length > 0 ? (
          <div id="posts" className="all-card">
            {postArray.map((post) => (
              <Cardpost
                post={post}
                key={post.id}
                id={post.id}
                // date={item.createdAt}
                // author={item.userId}
                // imagePost={item.imagePost}
                // description={item.description}
              />
            ))}
          </div>
        ) : (
          <div id="posts" className="all-card">
            <p className="no-card">Aucune publication</p>
          </div>
        )}
      </div>
    </>
  );
}
