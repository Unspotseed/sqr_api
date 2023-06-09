require('dotenv').config();
const express = require('express');
const cors = require('cors'); // connect back and front
const morgan = require('morgan'); // help to log info in terminal
const helmet = require('helmet'); // to protect secure by http (xss csrf clickJacking)
const rateLimit = require('express-rate-limit');

const authenticate = require('./middleware/authenticate');
const authRoute = require('./routes/auth-route');
const bookingRoute = require('./routes/booking-route');
const paymentRouter = require('./routes/payment-route');
const orderStatusRoute = require('./routes/orderStatus-route');
const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();

app.use(morgan('dev')); // use dev is more short than combine and it log when sth is req
app.use(
  rateLimit({
    windowMs: 10000 * 60 * 60,
    max: 100000000,
    message: { message: 'pls stop request ' },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/booking', authenticate, bookingRoute);
app.use('/payment', authenticate, paymentRouter);
app.use('/orderStatus', authenticate, orderStatusRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  //   console.log(chalk.bgWhite.greenBright(`Port ${port} ma la jaaaaaa!!!!!`))
  console.log(`Port: ${port} Square Room`)
);
