import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../Components/Nav/Navbar';
import Cardpost from '../Components/Posts/Cardpost';
import Post from '../Components/Posts/Post';
import Newpost from '../Components/Posts/Newpost';
import ScrollToTop from '../Components/Posts/ScrollToTop';
import { getAllPost, allComment } from '../Actions/postAction';
export default function Actus() {
  const dispatch = useDispatch();

  const { postArray, commentArray } = useSelector((state) => ({
    ...state.postReducer,
    ...state.commentReducer,
  }));

  useEffect(() => {
    async function allPosts() {
      const result = await getAllPost();
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'GET_POST',
          payload: result,
        });
      }
    }
    async function allComments() {
      const result = await allComment();
      if (!result) {
        console.log('erreur');
      } else {
        dispatch({
          type: 'GET_CMT',
          payload: result,
        });
      }
    }
    allPosts();
    allComments();
  }, []);

  // console.log('TABLEAU POST', postArray);

  return (
    <>
      <div className="">
        <NavBar />
        <Newpost />
      </div>
      <div className="1">
        {postArray.length > 0 ? (
          <section id="publications" className="2">
            {postArray.map((item) => (
              <Cardpost
                key={item.postId}
                id={item.postId}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                userId={item.userId}
                firstname={item['user.firstName']}
                lastname={item['user.lastName']}
                picture={item['user.profilePicture']}
                imagePost={item.imagePost}
                description={item.description}
              />
            ))}
          </section>
        ) : (
          <section id="publications" className="3">
            <p className="4">Aucune publication</p>
          </section>
        )}
        <ScrollToTop />,
      </div>
    </>
  );
}
