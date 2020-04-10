import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";
import axios from "axios";
import "../css/home.css";
import PostCard from "../components/PostCard";

const Home = (props) => {
  const context = useContext(Context);

  const [stateLocal, setState] = useState({ posts: [], fetched: false });

  useEffect(() => {
    if (!context.postsState) {
      axios
        .get("/api/get/allposts")
        .then((res) => {
          context.handleFetchPosts(res.data);
        })
        .catch((err) => console.log(err));
    } else if (!stateLocal.fetched) {
      setState({
        ...stateLocal,
        posts: [...context.postsState],
        fetched: true,
      });
    }
  }, [context, stateLocal]);

  function renderPostCards() {
    return stateLocal.posts.map((post) => {
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
