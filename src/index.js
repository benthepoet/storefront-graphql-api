const Koa = require('koa');
const app = new Koa();

module.exports = app;

app.listen(8040, () => console.log('API:READY'));