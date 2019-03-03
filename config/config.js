module.exports = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.NODE_ENV === 'production' ? 'nl-koa-www.herokuapp.com' : 'localhost'
};