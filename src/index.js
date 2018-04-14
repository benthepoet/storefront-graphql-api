const Koa = require('koa');
const authRouter = require('./auth');
const graphqlRouter = require('./graphql');

const app = new Koa();

app.use(authRouter.route());
app.use(authRouter.allowedMethods());

app.use(graphqlRouter.routes());
app.use(graphqlRouter.allowedMethods());

app.listen(8080, () => console.log('API:READY'));

module.exports = app;