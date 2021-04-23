/* eslint-env node */

module.exports = {
   root: true,
   parser: '@typescript-eslint/parser',
   plugins: ['@typescript-eslint', 'prettier'],
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
   ],
   rules: {
      'no-console': 0,
      'prettier/prettier': 0
   }
}
