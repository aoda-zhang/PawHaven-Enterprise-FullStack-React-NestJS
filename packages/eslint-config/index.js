/* eslint-disable global-require */
// Central export file for all ESLint configurations in the PawHaven monorepo.
// This allows each app to import only what it needs, e.g.:
// - "@pawhaven/eslint-config/base"
// - "@pawhaven/eslint-config/react"
// - "@pawhaven/eslint-config/node"

module.exports = {
  base: require('./base'),
  web: require('./web'),
  node: require('./node'),
};
