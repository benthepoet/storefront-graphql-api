const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const schema = require('./schema');

module.exports = contextBuilder => {
  const router = new Router();

  const endpointURL = '/graphql';
  const graphqlHandler = graphqlKoa(({ state }) => {
    const context = contextBuilder(state.user);
    return {
      cacheControl: true,
      context,
      schema
    };
  });
  
  router.get(endpointURL, cacher, graphqlHandler);
  router.post(endpointURL, bodyParser(), graphqlHandler);
  
  router.get('/graphiql', graphiqlKoa({ endpointURL }));
  
  return router;
};

async function cacher(ctx, next) {
  await next();
}