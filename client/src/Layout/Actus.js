import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../Components/Nav/Navbar';
import Cardpost from '../Components/Posts/Cardpost';
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

  return (
    <>
      <NavBar />
      <div className="feed">
        <Newpost />
        <div className="feed__container">
          {postArray.length > 0 ? (
            <section id="publications" className="feed__content">
              {postArray.map((item) => (
                <Cardpost
                  key={'id' + item.postId}
                  id={item.postId}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  userId={item.userId}
                  firstname={item['user.firstName']}
                  lastname={item['user.lastName']}
                  picture={item['user.profilePicture']}
                  imagePost={item.imagePost}
                  description={item.description}
                  likes={item.likes}
                />
              ))}
            </section>
          ) : (
            <section id="publications" className="no feed">
              <p className="4">Aucune publication</p>
            </section>
          )}
          <ScrollToTop />,
        </div>
      </div>
    </>
  );
}
