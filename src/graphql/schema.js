const fs = require('fs');
const glob = require('glob');
const requireDir = require('require-dir');
const { makeExecutableSchema } = require('graphql-tools');

const resolvers = requireDir('./resolvers');
const typeDefs = glob
  .sync('src/**/*.gql')
  .map(filename => fs.readFileSync(filename))
  .join();

const schema = makeExecutableSchema({
  resolvers,
  typeDefs 
});

module.exports = schema;