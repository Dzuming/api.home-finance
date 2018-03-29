import { getProfits } from '../models/profit';

export const getProfitsByUserAndDate = (req, res) => {
  getProfits(req.params).then(result => res.json(result));
};