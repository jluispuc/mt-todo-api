const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');
const {errorHandler, boomErrorHandler} = require('./middleware/error');

app.use(express.json());

// Sanitize data

// Security headers
app.use(helmet());

// To prevent XSS attacks
app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes,
  max: 500
});

app.use(limiter);

// Prevent http param pllution
app.use(hpp());

app.use(cors());

app.get('/', (req, res) => {
  res.send('MT To-Do will be amazing!');
})

routerApi(app);

//app.use(logError) it will to send errors to a log
app.use(boomErrorHandler);
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port' +  port);
});
