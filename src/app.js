// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors'); // connect back and front
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const errorMiddleware = require('./middleware/error');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();

app.use(cors());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 10000 * 60 * 60,
    max: 100000000,
    message: { message: 'pls stop request ' },
  })
);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  //   console.log(chalk.bgWhite.greenBright(`Port ${port} ma la jaaaaaa!!!!!`))
  console.log(`Port: ${port} Square Room`)
);
