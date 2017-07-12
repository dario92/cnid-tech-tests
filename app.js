const path = require('path');
const mu = require('mu2');
const express = require('express');
const getAllArticles = require('./helpers/articles.helpers').getAll;
const getArticle = require('./helpers/articles.helpers').getArticle;

const PORT = 3000;
const PUBLIC_FOLDER = path.resolve(__dirname, 'public');
const TEMPLATES_FOLDER = path.resolve(__dirname, 'templates');

mu.root = TEMPLATES_FOLDER;

const app = express();
app.use(express.static(PUBLIC_FOLDER));

app.get('/', (req, res) => {
  const articles = getAllArticles(['id', 'cover', 'title']);
  const stream = mu.compileAndRender('home.mustache', { articles });
  stream.pipe(res);
});

app.get('/article/:id', (req, res) => {
  const article = getArticle(parseInt(req.params.id));

  if (!article) {
    res.send(':( Unable to find article');
  } else {
    const stream = mu.compileAndRender('article.mustache', article);
    stream.pipe(res);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
