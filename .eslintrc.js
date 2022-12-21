module.exports = {
  //* Configuration for JavaScript files (global)
  extends: ['airbnb', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        bracketSameLine: true,
        endOfLine: 'auto'
      }
    ],
    'no-console': 'off'
  },
  overrides: [
    //* Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json']
      },
      plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports', '@emotion'],
      extends: [
        'airbnb',
        'airbnb/hooks',
        'next/core-web-vitals',
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',

        'prettier',
        'plugin:prettier/recommended'
      ],
      rules: {
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true
            }
          }
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false
          }
        ],
        'import/no-cycle': 'off',
        'react/prop-types': 'off',
        'no-param-reassign': 'off',
        'no-restricted-globals': 'off',
        'no-use-before-define': 'off',
        'no-return-assign': 'off',
        'no-debugger': 'warn',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'class-methods-use-this': 'off',
        'no-useless-escape': 'off',
        'no-promise-executor-return': 'off',
        'consistent-return': 'off',
        'default-param-last': 'off',
        camelcase: 'error',
        'spaced-comment': 'error',
        quotes: ['error', 'single'],
        'import/order': 'off',

        'unused-imports/no-unused-imports-ts': 'error',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': [
          'error',
          {
            ts: 'never',
            tsx: 'never',
            store: 'off',
            interface: 'off',
            style: 'off',
            scss: 'off'
          }
        ],
        semi: ['error', 'always'],
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton']
          }
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/jsx-no-constructed-context-values': 'off',

        'react/function-component-definition': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/display-name': ['off', { ignoreTranspilerName: true }],
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react/jsx-no-useless-fragment': 'off',

        '@emotion/jsx-import': 'error',
        '@emotion/no-vanilla': 'error',
        '@emotion/import-from-emotion': 'error',
        '@emotion/styled-import': 'error',

        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            trailingComma: 'none',
            printWidth: 100,
            tabWidth: 2,
            semi: true,
            bracketSameLine: true,
            endOfLine: 'auto'
          }
        ]
      }
    }
    //* Configuration for Jest test files
    // {
    //   files: ['**/*.test.ts', '**/*.test.tsx'],
    //   plugins: ['jest', 'jest-formatting', 'testing-library', 'jest-dom'],
    //   extends: [
    //     'plugin:jest/recommended',
    //     'plugin:jest-formatting/recommended',
    //     'plugin:testing-library/react',
    //     'plugin:jest-dom/recommended'
    //   ],
    //   rules: {
    //     '@typescript-eslint/no-unsafe-call': 'off',
    //     'jest-dom/prefer-in-document': 'off'
    //   }
    // }
  ]
};
