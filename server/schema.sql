
-- TODO: profile_image_url, total_likes?
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255),
  date_created DATE
);

-- TODO: image_url, likes
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(user_id),
  date_created TIMESTAMP,
);

CREATE TABLE post_comments (
  comment_id SERIAL PRIMARY KEY,
  body VARCHAR(255),
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  date_created TIMESTAMP
);

-- TODO: image_url, likes
-- CREATE TABLE edits (
--   edit_id SERIAL PRIMARY KEY,
--   title VARCHAR(255),
--   body VARCHAR,
--   username VARCHAR REFERENCES users(username),
--   date_created TIMESTAMP
-- );

-- CREATE TABLE edit_comments (
--   edit_comment_id SERIAL PRIMARY KEY,
--   body VARCHAR(255),
--   username VARCHAR REFERENCES users(username),
--   user_id INT REFERENCES users(user_id),
--   edit_id INT REFERENCES edits(edit_id),
--   date_created TIMESTAMP
-- );