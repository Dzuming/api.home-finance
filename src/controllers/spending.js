import resource from 'resource-router-middleware';
import { deleteSpending, editSpending, getSpendings, postSpending } from '../models/spending';
import logger from '../lib/logger';

export default ({config, db}) => resource({
    id: 'spendingId',

    load (req, id, callback) {
      const spendingId = id,
        err = spendingId ? null : 'Not found';
      callback(err, spendingId);
    },
    /** GET / - List all entities */
    index ({params}, res) {

    },

    /** POST / - Create a new entity */
    create (data, res) {
      const spending = data.body;
      postSpending(spending)
        .then(() => res.json(spending))
        .catch(error => logger.error(error));

    },

    /** GET /:id - Return a given entity */
    read ({spendingId}, res) {
    },

    /** PUT /:id - Update a given entity */
    update ({spendingId, body}, res) {
      editSpending(spendingId, body)
        .then(() => res.json(`wyedytowano wydatek o id ${spendingId}`))
        .catch(error => logger.error(error));
    },

    /** DELETE /:id - Delete a given entity */
    delete ({spendingId}, res) {
      deleteSpending(spendingId)
        .then(() => res.json({id: spendingId}))
        .catch(error => logger.error(error));
    }
  }
);
export const getSpendingByUserAndDate = (req, res) => {
  getSpendings(req.params)
    .then(result => res.json(result))
    .catch(error => logger.error(error));
};