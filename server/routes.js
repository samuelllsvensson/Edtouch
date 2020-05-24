var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/get/posts", (req, res, next) => {
  pool.query(
    `SELECT posts.post_id, title, body, posts.date_created, image_id, username, avatar
    FROM posts INNER JOIN users ON users.user_id = posts.user_id ORDER BY posts.date_created DESC`,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/user/:user_id/posts", (req, res, next) => {
  const user_id = req.params.user_id;
  pool.query(
    `SELECT * FROM posts WHERE user_id=$1 ORDER BY date_created DESC`,
    [user_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/user/:user_id/likes_count", (req, res, next) => {
  const user_id = req.params.user_id;

  pool.query(
    `SELECT SUM(likes) FROM edits WHERE user_id=$1`,
    [user_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/user/:user_id/avatar", (req, res, next) => {
  const user_id = req.params.user_id;
  const url = req.body.url;
  pool.query(
    `UPDATE users SET avatar=$1 WHERE user_id=$2`,
    [url, user_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/post/:post_id", (req, res, next) => {
  const post_id = req.params.post_id;
  //console.log(req);
  pool.query(
    `SELECT posts.post_id, title, body, posts.user_id, posts.date_created, image_id, username, avatar
    FROM posts 
    INNER JOIN users ON users.user_id = posts.user_id
    WHERE post_id=$1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows[0]);
    }
  );
});

router.get("/api/get/post/:post_id/comments", (req, res, next) => {
  const post_id = req.params.post_id;
  pool.query(
    `SELECT comment_id, body, users.username, users.avatar, post_comments.date_created
      FROM post_comments
      INNER JOIN users ON users.user_id = post_comments.user_id
      WHERE post_id=$1
      ORDER BY post_comments.date_created DESC`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/user", (req, res, next) => {
  const defaultAvatar = "fo6vnzyazyassftnt0mf";
  const values = [
    req.body.profile.nickname,
    req.body.profile.email,
    defaultAvatar,
  ];
  pool.query(
    `INSERT INTO users(username, email, avatar, date_created)
              VALUES($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/:post_id/postcomment", (req, res, next) => {
  const values = [
    req.body.comment,
    req.body.username,
    req.body.userId,
    req.params.post_id,
  ];
  pool.query(
    `INSERT INTO post_comments(body, username, user_id, post_id, date_created)
              VALUES($1, $2, $3, $4, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/edit/:edit_id/like", (req, res, next) => {
  const values = [[req.body.userId], req.params.edit_id];

  pool.query(
    `UPDATE edits SET likes_users = likes_users || $1, likes = likes + 1
            WHERE NOT (likes_users @> $1)
            AND edit_id = ($2)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/edit/:edit_id/unlike", (req, res, next) => {
  const values = [req.body.userId, [req.body.userId], req.params.edit_id];

  pool.query(
    `UPDATE edits SET likes_users = array_remove(likes_users, $1), likes = likes - 1
            WHERE (likes_users @> $2)
            AND edit_id = ($3)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/user", (req, res, next) => {
  const email = req.query.email;
  pool.query(
    `SELECT * FROM users
              WHERE email=$1`,
    [email],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/:post_id/postcomment", (req, res, next) => {
  const values = [
    req.body.comment,
    req.body.username,
    req.body.user_id,
    req.params.post_id,
    req.body.comment_id,
  ];
  pool.query(
    `UPDATE post_comments SET body = $1, username = $2, user_id = $3, post_id = $4, date_created = NOW()
              WHERE comment_id=$5`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.delete("/api/delete/:comment_id", (req, res, next) => {
  const comment_id = req.params.comment_id;
  //console.log(comment_id);
  pool.query(
    `DELETE FROM post_comments
              WHERE comment_id=$1`,
    [comment_id],
    (q_err, q_res) => {
      res.json(q_res);
      //console.log(q_err);
    }
  );
});

router.post("/api/post/post", (req, res, next) => {
  const values = [
    req.body.title,
    req.body.description,
    req.body.image_id,
    req.body.user_id,
  ];
  pool.query(
    `INSERT INTO posts(title, body, image_id, user_id, date_created)
              VALUES($1, $2, $3, $4, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/:post_id/edits", (req, res, next) => {
  const post_id = req.params.post_id;
  pool.query(
    `SELECT edit_id, edits.user_id, post_id, body, image_id, edits.date_created, username, avatar, likes_users, likes FROM edits
    INNER JOIN users ON users.user_id = edits.user_id
    WHERE post_id=$1
    ORDER BY date_created DESC`,
    [post_id],
    (q_err, q_res) => {
      //console.log(q_err);
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/:post_id/edits/:edit_id", (req, res, next) => {
  const post_id = req.params.post_id;
  const edit_id = req.params.edit_id;
  pool.query(
    `SELECT edit_id, edits.user_id, post_id, body, image_id, edits.date_created, username, likes_users, likes FROM edits
    INNER JOIN users ON users.user_id = edits.user_id
    WHERE post_id=$1 AND edit_id=$2`,
    [post_id, edit_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/edit", (req, res, next) => {
  const values = [
    req.body.post_id,
    req.body.description,
    req.body.image_id,
    req.body.user_id,
  ];
  pool.query(
    `INSERT INTO edits(post_id, body, image_id, user_id, date_created)
              VALUES($1, $2, $3, $4, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.delete("/api/delete/edit/:edit_id", (req, res, next) => {
  const edit_id = req.params.edit_id;
  pool.query(
    `DELETE FROM edits WHERE edit_id=$1`,
    [edit_id],
    (q_err, q_res) => {
      res.json(q_res);
    }
  );
});

router.put("/api/put/:edit_id/edit", (req, res, next) => {
  const values = [
    req.body.description,
    req.body.user_id,
    req.body.post_id,
    req.params.edit_id,
    req.body.image_id,
  ];
  pool.query(
    `UPDATE edits SET  body = $1, user_id = $2, post_id = $3, edit_id = $4, image_id = $5, date_created = NOW()
              WHERE edit_id=$4`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

/*
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
