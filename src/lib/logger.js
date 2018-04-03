import fs from 'fs';
import winston from 'winston';

const logger = () => {
  const dir = 'logs';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new winston.Logger({
    transports: [
      new winston.transports.File({
        file: 'error',
        filename: `${dir}/error.log`,
        level: 'error'
      })
    ],
    exitOnError: false
  });
};

export default logger();