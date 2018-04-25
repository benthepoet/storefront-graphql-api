const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const R = require('ramda');
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
  
  router.get(endpointURL, cacher(), graphqlHandler);
  router.post(endpointURL, bodyParser(), graphqlHandler);
  
  router.get('/graphiql', graphiqlKoa({ endpointURL }));
  
  return router;
};

function cacher() {
  const getMinAge = R.pipe(
    R.path(['extensions', 'cacheControl', 'hints']),
    R.map(R.prop('maxAge')),
    R.reduce(R.min, Infinity)
  );
  
  return async (ctx, next) => {
    await next();
    
    const minAge = getMinAge(ctx.body);
    if (!R.isNil(minAge) && minAge > 0) {
      ctx.set('Cache-Control', `public, max-age=${minAge}`);
    }
  };
}