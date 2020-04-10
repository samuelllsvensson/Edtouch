import React, { useContext, useEffect } from "react";
import Context from "../utils/context";

import "../css/home.css";
import PostCard from "../components/PostCard";

const Home = () => {
  const { postsState, handleFetchPosts } = useContext(Context);

  useEffect(() => {
    if (!postsState.posts) handleFetchPosts();
  }, [handleFetchPosts, postsState]);

  function renderPostCards() {
    if (!postsState.posts) return;
    return postsState.posts.map((post) => {
      return (
        <div key={post.post_id} className="column is-one-quarter">
          <Link to={`/post/${post.post_id}`}>
            <PostCard post={post} />{" "}
          </Link>{" "}
        </div>
      );
    });
  }

  return (
    <div className="container">
      <div className="columns is-multiline">{renderPostCards()}</div>
    </div>
  );
};

export default Home;
