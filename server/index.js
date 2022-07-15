require('dotenv/config');
const pg = require('pg');
const path = require('path');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.use(express.json());

app.get('/api/hello', (req, res, next) => {
  res.json({ hello: 'world' });
});

app.get('/api/article-info', (req, res, next) => {
  const { title, publishedAt } = req.query;
  const sql = `
    select *
      from "reviewedArticles"
     where "title" = $1
     and   "publishedAt" = $2
  `;
  const params = [title, publishedAt];
  db.query(sql, params)
    .then(result => {
      const article = result.rows[0];
      if (!article) {
        const anError = { error: 'could not find article' };
        res.json(anError);
      }
      res.json(article);
    })
    .catch(err => next(err));
});

app.get('/api/all-reviews/:articleId', (req, res, next) => {
  const articleId = Number(req.params.articleId);
  const sql = `
    select count("articleId")
      from "reviews"
      where "articleId" = $1
  `;
  const params = [articleId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/all-inform-reviews/:articleId', (req, res, next) => {
  const articleId = Number(req.params.articleId);
  const sql = `
    select count("rating")
      from "reviews"
      where "articleId" = $1
      and   "rating" = 'inform'
  `;
  const params = [articleId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/reviews/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const sql = `
    select *
      from "reviews"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const theReviews = result.rows;
      res.json(theReviews);
    })
    .catch(err => next(err));
});

app.get('/api/articles/:articleId', (req, res, next) => {
  const articleId = Number(req.params.articleId);
  const sql = `
    select *
      from "reviewedArticles"
      where "articleId" = $1
  `;
  const params = [articleId];
  db.query(sql, params)
    .then(result => {
      const theArticle = result.rows[0];
      res.json(theArticle);
    })
    .catch(err => next(err));
});

app.get('/api/all-user-reviews/:articleId', (req, res, next) => {
  const articleId = Number(req.params.articleId);
  const sql = `
    select *
      from "reviews"
      where "articleId" = $1
  `;
  const params = [articleId];
  db.query(sql, params)
    .then(result => {
      const theArticle = result.rows;
      res.json(theArticle);
    })
    .catch(err => next(err));
});

app.get('/api/usernames/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const sql = `
    select *
      from "users"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const theArticle = result.rows[0];
      res.json(theArticle);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "createdAt")
        values ($1, $2, now())
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/article-review', (req, res, next) => {
  const { articleInfo } = req.body;
  const theImage = articleInfo.image;
  const theUrl = articleInfo.url;
  const theTitle = articleInfo.title;
  const theDescription = articleInfo.description;
  const theContent = articleInfo.content;
  const theDate = articleInfo.publishedAt;
  const theSource = articleInfo.source;
  const sql = `
        insert into "reviewedArticles" ("image", "url", "title", "description", "content", "publishedAt", "source")
        values ($1, $2, $3, $4, $5, $6, $7)
        returning "articleId"
      `;
  const params = [theImage, theUrl, theTitle, theDescription, theContent, theDate, theSource];
  db.query(sql, params)
    .then(result => {
      const articleId = result.rows[0];
      res.json(articleId);
    })
    .catch(err => next(err));
});

app.post('/api/user-review', (req, res, next) => {
  const { articleId } = req.query;
  const { userId } = req.user;
  const { currentRating, currentReview } = req.body;
  const sql = `
        insert into "reviews" ("articleId", "userId", "rating", "comments", "createdAt")
        values ($1, $2, $3, $4, now())
        returning *
      `;
  const params = [articleId, userId, currentRating, currentReview];
  db.query(sql, params)
    .then(result => {
      const article = result.rows;
      if (!article) {
        res.status(404).json({
          error: `cannot find article with articleId ${articleId}`
        });
      }
      res.json(article);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
