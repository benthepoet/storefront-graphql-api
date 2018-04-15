const Koa = require('koa');
const jwt = require('koa-jwt');

const config = require('./config');
const { buildContext } = require('./context');
const graphqlRouter = require('./graphql')(buildContext);

const app = new Koa();

app.use(jwt(config.jwt));

app.use(graphqlRouter.routes());
app.use(graphqlRouter.allowedMethods());

app.listen(8080, () => console.log('API:READY'));

module.exports = app;