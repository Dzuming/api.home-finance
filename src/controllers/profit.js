import { getProfitById, getProfits, postProfit, deleteProfit, editProfit } from '../models/profit';
import logger from '../lib/logger';
import resource from 'resource-router-middleware';

export default () => resource({
  id: 'profitId',

  load (req, id, callback) {
    const profitId = id,
      err = profitId ? null : 'Not found';
    callback(err, profitId);
  },
  /** GET / - List all entities */
  index ({params}, res) {

  },

  /** POST / - Create a new entity */
  create (data, res) {
    const profit = data.body;
    postProfit(profit)
      .then(response => getProfitById(response.id)
        .then(resProfit =>
          res.json({
            profit: resProfit,
            message: `Dodano zysk o id ${response.id}`
          }))
        .catch(error => logger.error(error)))
      .catch(error => logger.error(error));
  },

  /** PUT /:id - Update a given entity */
  update ({profitId, body}, res) {
    editProfit(profitId, body)
      .then(() => res.json(`wyedytowano zysk o id ${profitId}`))
      .catch(error => logger.error(error));
  },

  /** DELETE /:id - Delete a given entity */
  delete ({profitId}, res) {
    deleteProfit(profitId)
      .then(() => res.json({id: profitId}))
      .catch(error => logger.error(error));
  }
})

export const getProfitsByUserAndDate = (req, res) => {
  getProfits(req.params)
    .then(result => res.json(result))
    .catch(error => logger.error(error));
};