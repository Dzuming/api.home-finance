import logger from '../lib/logger';
import { getAssumptionsFromPeriod } from '../models/assumptions';

export const getAssumptions = (req, res) => {
  getAssumptionsFromPeriod(req.params)
    .then(assumptions => res.json(assumptions))
    .catch(error => logger.error(error));
};
