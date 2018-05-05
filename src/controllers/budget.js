import { getBudgetFromDb } from '../models/budget';
import logger from '../lib/logger';

export const getBudget = (req, res) => {
  getBudgetFromDb(req.params)
    .then(budget => res.json({ budget: budget.toFixed(2) }))
    .catch(error => logger.error(error));
};
