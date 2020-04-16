var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/get/posts", (req, res, next) => {
  pool.query(`SELECT * FROM posts`, (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

router.get("/api/get/post/:post_id", (req, res, next) => {
  const post_id = req.params.post_id;
  //console.log(req);
  pool.query(
    `SELECT * FROM posts WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      //console.log(q_res);
      res.json(q_res.rows[0]);
    }
  );
});

router.get("/api/get/post/:post_id/comments", (req, res, next) => {
  const post_id = req.params.post_id;
  console.log("HEJ", post_id);
  pool.query(
    `SELECT comment_id, body, author, name, post_comments.date_created
      FROM post_comments
      INNER JOIN users ON users.user_id = post_comments.user_comment_id
      WHERE post_comment_id=$1`,
    [post_id],
    (q_err, q_res) => {
      console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

/*
/api/get/post?:id Retrieves a specific post given a post_id
/api/post/posttodb: Saves a user post to the database
/api/put/post: Edits a existing post in the database.
/api/delete/postcomments: Deletes all the comments associated with a post
/api/delete/post: Deletes a post with the post id.
/api/get/allpostcomments: Retrieves all the comments associated with a single post
/api/post/postcommenttodb: Saves a comment to the database
/api/put/postcommenttodb: edits an existing comment in the database
/api/delete/postcomment: Deletes a single comment

/api/get/alledits: Retrieves all edits
/api/delete/deleteedit: Deletes the edit and its comments 

/api/get/alleditcomments: Retrieves all edit comments associated with a single edit
/api/post/editcommenttodb: Saves an edit comment to the database
/api/put/editcommenttodb: edits an existing edit comment in the database
/api/delete/editcomment: Deletes a single edit comment

/api/posts/userprofiletodb: Saves a user profile data from auth0 to our own database.
/api/get/userprofilefromdb: Retrieves a user by looking up their email
/api/get/userposts: retrieves posts made by a user by looking up all posts that matches their user id.

/api/get/otheruserprofilefromdb: get another users profile data from the database and view on their profile page.
/api/get/otheruserposts: Get another users posts when you view their profile page
*/

module.exports = router;
