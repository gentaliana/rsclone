module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'no-plusplus': 'off',
    'operator-linebreak': 'off',
    'no-continue': 'off',
    'nonblock-statement-body-position': 'off',
    curly: 'off',
    'linebreak-style': ['error', 'windows'],
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-one-expression-per-line': 'off',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
