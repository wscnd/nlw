module.exports = {
   root: true,
   env: {
      browser: true,
      commonjs: true
   },
   parser: '@typescript-eslint/parser',
   plugins: ['@typescript-eslint', 'prettier', 'html'],
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
