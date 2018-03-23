import resource from 'resource-router-middleware';
import { deleteSpending, getSpendings, postSpending } from '../models/spending';

export default ({config, db}) => resource({

  /** GET / - List all entities */
  index ({params}, res) {
    getSpendings().then(result => res.json(result));
  },

  /** POST / - Create a new entity */
  create (data, res) {
    const spending = data.body;
    postSpending(spending);
    res.json(spending);
  },

  /** GET /:id - Return a given entity */
  read ({facet: spending}, res) {
    res.json(spending);
  },

  /** PUT /:id - Update a given entity */
  update ({spending: spending, body}, res) {
    for (let key in body) {
      if (key !== 'id') {
        spending[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete ({id}, res) {
    deleteSpending(id);
    res.sendStatus(200);
  }
});
