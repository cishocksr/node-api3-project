const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(logger);
server.use(helmet());
server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

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
