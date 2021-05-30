module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    /* Console & Debugger */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    /* Vue */
    'vue/max-attributes-per-line': 'off',
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style'],
    }],

    /* TypeScript */
    // Fix ESLint error of "Cannot read property 'loc' of undefined."
    // https://github.com/typescript-eslint/typescript-eslint/issues/792#issuecomment-517762395
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/type-annotation-spacing': 'error',
    // TODO: express warning first
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    /* Import */
    'import/order': ['error', {
      alphabetize: { order: 'asc' },
      'newlines-between': 'always',
    },
    ],
    'sort-imports': ['error',
      { ignoreDeclarationSort: true },
    ],

    /* Other */
    'no-shadow': ['error', {
      allow: ['_'],
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
