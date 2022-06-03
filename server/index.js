require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');

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

app.get('/api/hello', (req, res, next) => {
  res.json({ hello: 'world' });
});

app.get('/api/article-info', (req, res, next) => {
  const { title, source } = req.query;
  const sql = `
    select *
      from "reviewedArticles"
     where "title" = $1
     and   "source" = $2
  `;
  const params = [title, source];
  db.query(sql, params)
    .then(result => {
      const article = result.rows;
      res.json(article);
    })
    .catch(err => next(err));
});

app.post('/api/user-review', (req, res, next) => {
  const { articleInfo } = req.body;
  const theImage = articleInfo.image;
  const theUrl = articleInfo.url;
  const theTitle = articleInfo.title;
  const theDescription = articleInfo.description;
  const theContent = articleInfo.content;
  const theDate = articleInfo.publishedAt;
  const theSource = articleInfo.source;
  const sql = `
        insert into "reviewedArticles" ("imageUrl", "originalUrl", "title", "shortDescription", "content", "articleDate", "source")
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
