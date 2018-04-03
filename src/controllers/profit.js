import { getProfits } from '../models/profit';
import logger from '../lib/logger';

export const getProfitsByUserAndDate = (req, res) => {
  getProfits(req.params)
    .then(result => res.json(result))
    .catch(error => logger.error(error));
};