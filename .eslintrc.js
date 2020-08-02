/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  settings: {},
  rules: {
    '@typescript-eslint/no-var-requires': [0],
  },
};
