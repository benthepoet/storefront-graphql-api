const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const schema = require('./schema');

module.exports = (buildContext) => {
  const router = new Router();

  const endpointURL = '/graphql';
  const graphqlHandler = graphqlKoa(ctx => {
    return {
      context: buildContext(ctx.user),
      schema
    };
  });
  
  router.post(endpointURL, bodyParser(), graphqlHandler);
  router.get(endpointURL, graphqlHandler);
  
  router.get('/graphiql', graphiqlKoa({ endpointURL }));
  
  return router;
};

