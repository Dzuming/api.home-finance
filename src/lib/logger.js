import fs from 'fs';
import winston from 'winston';

const logger = () => {
  const dir = 'logs';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new winston.Logger({
      transports: [
        new winston.transports.File({filename: `${dir}/error.log`})
      ],
      exitOnError: false
    });
};

export default logger();