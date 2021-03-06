import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './routes';
import config from './config';
import logger from './lib/logger';
require('./lib/passport');
let app = express();
app.server = http.createServer(app);

// logger
const loggerstream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
app.use(
  morgan('common', {
    stream: loggerstream,
    skip: function(req, res) {
      return res.statusCode < 400;
    },
  }),
);

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders,
  }),
);

app.use(bodyParser.json({ limit: config.bodyLimit }));
app.use(middleware());

app.use('/api', api());

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
