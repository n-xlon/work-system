module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  extends: [
    // "plugin:vue/recommended",
    "eslint:recommended"
  ]
}
