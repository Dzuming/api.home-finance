import { getRevenueFromDb } from '../models/revenue';
import logger from '../lib/logger';

export const getRevenue = (req, res) => {
  getRevenueFromDb(req.params)
    .then(revenue => res.json({ revenue: revenue.toFixed(2) }))
    .catch(error => logger.error(error));
};
