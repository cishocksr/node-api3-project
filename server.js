const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  req.timeStamp = Date.now();
  console.log(`${req.method}, ${req.url}, ${req.timeStamp}`);
  next();
}

module.exports = server;
