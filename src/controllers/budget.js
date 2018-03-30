import { getBudgetFromDb } from '../models/budget';

export const getBudget = (req, res) => {
  getBudgetFromDb(req.params).then(budget => res.json({budget}));
};