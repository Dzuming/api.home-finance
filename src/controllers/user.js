import resource from 'resource-router-middleware';
import { getUserByEmail } from '../models/user';

export default () => resource({
  id: 'email',

  load (req, id, callback) {
    const email = id,
      err = email ? null : 'Not found';
    callback(err, email);
  },

  /** GET /:id - Return a given entity */
  read ({email}, res) {
    getUserByEmail(email).then(result => res.json({
      id: result.id,
      name: result.name,
      email: result.email,
    }));
  },
});
