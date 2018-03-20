import resource from 'resource-router-middleware';
import { spending } from '../models/spending';

export default ({config, db}) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'spending',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load (req, id, callback) {
    let spending = spending.find(facet => facet.id === id),
      err = spending ? null : 'Not found';
    callback(err, spending);
  },

  /** GET / - List all entities */
  index ({params}, res) {
  spending().then(result => res.json(result));
  },

  /** POST / - Create a new entity */
  create ({body}, res) {
    body.id = spending.length.toString(36);
    spending.push(body);
    res.json(body);
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
  delete ({spending: spending}, res) {
    spending.splice(spending.indexOf(spending), 1);
    res.sendStatus(204);
  }
});
