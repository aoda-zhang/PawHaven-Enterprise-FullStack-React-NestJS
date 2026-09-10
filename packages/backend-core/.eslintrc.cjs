module.exports = {
  extends: ['@pawhaven/eslint-config/node'],
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
