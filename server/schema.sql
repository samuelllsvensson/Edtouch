CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  date_created DATE,
  avatar VARCHAR(255)
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(user_id),
  date_created TIMESTAMP,
  image_id VARCHAR(255)
);

CREATE TABLE post_comments (
  comment_id SERIAL PRIMARY KEY,
  body VARCHAR(255),
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
  date_created TIMESTAMP
);

CREATE TABLE edits (
  edit_id SERIAL PRIMARY KEY,
  body VARCHAR,
  post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id INT REFERENCES users(user_id),
  image_id VARCHAR,
  date_created TIMESTAMP,
  likes_users INT[] DEFAULT ARRAY[]::INT[],
  likes int DEFAULT 0
);

CREATE TABLE edit_comments (
  edit_comment_id SERIAL PRIMARY KEY,
  body VARCHAR(255),
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(user_id),
  edit_id INT REFERENCES edits(edit_id) ON DELETE CASCADE,
  date_created TIMESTAMP
);