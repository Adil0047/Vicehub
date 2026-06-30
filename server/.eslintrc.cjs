module.exports = {
  root: true,
  env: { node: true, es2021: true },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'uploads'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
