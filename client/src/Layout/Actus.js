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
  // const [count, setCount] = useState(3);
  const { postArray, commentArray } = useSelector((state) => ({
    ...state.postReducer,
    ...state.commentReducer,
  }));

  //fonction pour charger d'autres post quand on arrive sur la fin du scroll
  // const loadMore = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >
  //     document.scrollingElement.scrollHeight
  //   ) {
  //     setLoadPosts(true);
  //   }
  // };
  useEffect(() => {
    async function allPosts() {
      const result = await getAllPost();
      // const result = await getAllPost(count);
      if (!result) {
        console.log('erreur');
      } else {
        //}else if (loadpost)
        dispatch({
          type: 'GET_POST',
          payload: result,
        });
      }
      // setLoadPosts(false);
      // setCount(count + 3);
    }
    // window.addEventListener('scroll', loadMore);
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

  // infinite scroll enlevé car warning quand sur page profil ?? : react-dom.development.js:67 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  return (
    <>
      <div className="">
        <NavBar />
        <Newpost />
      </div>
      <div className="1">
        {postArray.length > 0 ? (
          <section id="publications" className="feed">
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
          <section id="publications" className="no feed">
            <p className="4">Aucune publication</p>
          </section>
        )}
        <ScrollToTop />,
      </div>
    </>
  );
}
