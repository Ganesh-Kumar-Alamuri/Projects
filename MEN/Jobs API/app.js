require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect')
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')
// security packages
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const rate = require('express-rate-limit')
const authorizationMiddleware = require('./middleware/authentication')
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.set('trust proxy', 1)
app.use(rate.rateLimit({
  windowMs:15*60*1000,
  max:100
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

// extra packages

// routes
app.use('/api/v1/auth',auth)
app.use('/api/v1/jobs',authorizationMiddleware,jobs)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
