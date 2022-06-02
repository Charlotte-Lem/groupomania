import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../Components/Nav/Navbar';
import Cardpost from '../Components/Posts/Cardpost';
import Newpost from '../Components/Posts/Newpost';
import ScrollToTop from '../Components/Posts/ScrollToTop';
import { getAllPost, allComment } from '../Actions/postAction';
export default function Actus() {
  const dispatch = useDispatch();
  const [loadPosts, setLoadPosts] = useState(true);
  const [count, setCount] = useState(3);
  const { postArray, commentArray } = useSelector((state) => ({
    ...state.postReducer,
    ...state.commentReducer,
  }));

  //fonction pour charger d'autres post quand on arrive sur la fin du scroll
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };
  useEffect(() => {
    async function allPosts() {
      const result = await getAllPost(count);
      if (!result) {
        console.log('erreur');
      } else if (loadPosts) {
        dispatch({
          type: 'GET_POST',
          payload: result,
        });
      }
      setLoadPosts(false);
      setCount(count + 3);
    }
    window.addEventListener('scroll', loadMore);
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
  }, [loadPosts]);

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
                // key={uuidv4()}
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
          <section id="publications" className="3">
            <p className="4">Aucune publication</p>
          </section>
        )}
        <ScrollToTop />,
      </div>
    </>
  );
}
