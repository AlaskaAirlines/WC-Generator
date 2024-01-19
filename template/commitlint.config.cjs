module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 120],
    'footer-max-line-length': [0, 'always', 120],
    'header-max-length': [0, 'always', 120],
  },
};
