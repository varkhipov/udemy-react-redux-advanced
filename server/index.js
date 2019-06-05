const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');


// DB Setup
// { useNewUrlParser: true } is mandatory: https://mongoosejs.com/docs/connections.html
// { useCreateIndex: true } is recommended: https://mongoosejs.com/docs/deprecations.html
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect('mongodb://localhost:27017/auth', mongooseOptions);


// App Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
