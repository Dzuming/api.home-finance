import logger from '../lib/logger';
import { assumptionCalculation, assumptionMap } from '../models/assumptions';

export const getAssumptions = (req, res) => {
  assumptionCalculation(req.params)
    .then(({ assumptions, profitSum }) =>
      res.json(
        assumptions.map(assumption => assumptionMap(assumption, profitSum)),
      ),
    )

    .catch(error => logger.error(error));
};
