require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authenticationMiddelware=require('./middleware/authentication')


//connectDb
const connectDb=require('./db/connect')

//router
const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
// security packages
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')
app.use(rateLimiter({windowMS:15*60*1000 // 15 minutes
,
max:100//limit ip to each 100 request for each windowms,
}))
app.set('trust proxy',1) // if the app is on revers proxy according to there docs 
app.use(helmet())
app.use(cors())
app.use(xss())
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticationMiddelware,jobsRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
