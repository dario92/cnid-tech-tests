const data = require('../data/article.json');
const getAll = require('../helpers/articles.helpers').getAll;
const getArticle = require('../helpers/articles.helpers').getArticle;

describe('articles.helper', () => {
  describe('getAll', () => {
    it('should return an array', () => {
      expect(Array.isArray(getAll())).toBe(true);
    });

    it('should return all articles', () => {
      expect(getAll().length).toBe(data.length);
    });

    it('should return just id for each article', () => {
      const article = getAll(['id'])[0];
      expect(Object.keys(article)).toEqual(['id']);
    });

    it('should return all field', () => {
      const article = getAll()[0];
      expect(Object.keys(article)).toEqual(Object.keys(data[0]));
    });
  })

  describe('getArticle', () => {
    it('should return an object', () => {
      expect(typeof getArticle(0)).toBe('object');
    });

    it('should return null', () => {
      expect(getArticle()).toBeFalsy();
    });

    it('should return correct article', () => {
      expect(getArticle(0, false)).toEqual(data[0]);
    });

    it('should return properties to render template', () => {
      const article = getArticle(0);
      const articleBodyKeys = Object.keys(article.body[0]);
      const dataBodyKeys = Object.keys(data[0].body[0]);
      expect(articleBodyKeys.length).toEqual(dataBodyKeys.length + 1);
    })
  });
})
