import logger from '../lib/logger';
import {
  sumAssumptions,
  getAssumptionsFromPeriod,
  saveAssumption,
  getAssumptionTypesFromPeriod,
} from '../models/assumptions';
import resource from 'resource-router-middleware';

export default () =>
  resource({
    /** POST / - Create a new entity */
    create(data, res) {
      const assumption = data.body;
      saveAssumption(assumption)
        .then(assumption => res.json(assumption))
        .catch(error => logger.error(error));
    },
  });

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

export const getAssumptionTypes = (req, res) => {
  getAssumptionTypesFromPeriod(req.params).then(assumptionTypes =>
    res.json(assumptionTypes),
  );
};
