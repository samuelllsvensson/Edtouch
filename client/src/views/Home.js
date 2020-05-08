import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPhotos } from "../utils/CloudinaryService";
import Context from "../utils/context";
import "../css/home.css";
import PostCard from "../components/PostCard";

const Home = () => {
  const { postsState, authState, handleFetchPosts } = useContext(Context);

  useEffect(() => {
    handleFetchPosts();
  }, []);

  function renderPostCards() {
    if (postsState.loadings["FETCH_POSTS"]) {
      return (
        <div className="column is-one-quarter">
          <h1>Loading...</h1>
        </div>
      );
    }
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
