import logger from '../lib/logger';
import {
  sumAssumptions,
  getAssumptionsFromPeriod,
} from '../models/assumptions';

export const getAssumptionsByUsers = (req, res) => {
  sumAssumptions(req.params)
    .then(assumptions => res.json(assumptions))
    .catch(error => logger.error(error));
};

export const getAssumptions = (req, res) => {
  getAssumptionsFromPeriod(req.params)
    .then(assumptions => res.json(assumptions))
    .catch(error => logger.error(error));
};
