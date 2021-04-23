module.exports = {
   root: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
         jsx: true
      }
   },
   settings: {
      react: {
         version: 'detect' // Automatically detect the react version
      }
   },
   env: {
      browser: true,
      amd: true,
      node: true
   },

   plugins: ['@typescript-eslint', 'prettier'],
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
   ],
   rules: {
      'no-console': 0,
      'prettier/prettier': 0,
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': [
         'error',
         {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton']
         }
      ]
   }
}
