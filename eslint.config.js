import antfu from '@antfu/eslint-config';

export default antfu(
  {},
  {
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'style/semi': [2, 'always'],
      'ts/no-require-imports': 'off',
      'vue/return-in-computed-property': 'off',
      'style/member-delimiter-style': [
        2,
        {
          singleline: {
            delimiter: 'semi',
          },
        },
      ],
      'style/arrow-parens': 'off',
      'ts/consistent-type-definitions': 'off',
      'style/brace-style': 'off',
      'perfectionist/sort-imports': "off",
    },
  },
);
