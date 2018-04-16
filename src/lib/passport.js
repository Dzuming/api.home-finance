import passport from 'passport';
import Strategy from 'passport-local';
import { getUserByEmail } from '../models/user';
import bcrypt from 'bcrypt';
import logger from './logger';

const authenticate = passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(email, password, cb) {
      const hash = bcrypt.hashSync(password, 10);
      bcrypt.compare(password, hash, function(err, res) {
        if (res) {
          getUserByEmail(email)
            .then(user => {
              logger.info(user);
              if (!user) {
                return cb(null, false, {
                  message: 'Incorrect email or password.',
                });
              }
              return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
        } else {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }
      });
    },
  ),
);

export default authenticate;
