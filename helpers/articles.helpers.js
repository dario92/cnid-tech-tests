const articles = require('../data/article.json');

/**
 * @name getAll
 * @desc Get all articles
 * @param {array<string>} [fields] - Specify which fields you want to return
 * of each article
 * @returns {array<object>} - Returns an array of objects rappresenting and each article.
 */
module.exports.getAll = (fields) => {
  return fields ? articles.map((article) => {
    return fields.reduce((obj, field) => Object.assign({}, obj, { [field]: article[field] }) , {});
  }) : articles;
};

/**
 * @name getArticle
 * @desc Get a single article.
 * @param {number} [id] - Required argument which rappresent the id of the article that need to
 * be returned.
 * @param {boolean} [returnTemplateFields=true] - Decorate the article object with properites needed
 * to render the template.
 * @return {object|null}
 */
module.exports.getArticle = (id, returnTemplateFields = true) => {
  return articles.reduce((data, article) => {
    if (article.id === id) {
      data = Object.assign({}, article);

      if (returnTemplateFields) {
        data.body = data.body.map(item => Object.assign({}, item, { [`is_${item.type}`]: true }));
      }
    }

    return data;
  }, null);
};
