module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*'],
      env: {
        jest: true,
      },
    },
  ],
};
