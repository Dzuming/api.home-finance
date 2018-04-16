import { getBudgetFromDb } from '../models/budget';
import logger from '../lib/logger';

export const getBudget = (req, res) => {
  getBudgetFromDb(req.params)
    .then(budget => res.json({ budget }))
    .catch(error => logger.error(error));
};
