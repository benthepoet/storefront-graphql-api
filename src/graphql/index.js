const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const glob = require('glob');
const bodyParser = require('koa-bodyparser');
const requireDir = require('require-dir');
const Router = require('koa-router');

const resolvers = requireDir('./resolvers');
const typeDefs = glob
    .sync('src/**/*.gql')
    .map(filename => fs.readFileSync(filename))
    .join();

const schema = makeExecutableSchema({
    resolvers,
    typeDefs 
});

const router = new Router();

router.post('/graphql', bodyParser(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

module.exports = router;

