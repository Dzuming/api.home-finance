import passport from 'passport';
import Strategy from 'passport-local';
import { getUserByEmailPassword } from '../models/user';

const authenticate = passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    getUserByEmailPassword(email, password).then(user => {
      if (!user) {
        return cb(null, false, {message: 'Incorrect email or password.'});
      }
      return cb(null, user, {message: 'Logged In Successfully'});
    })
      .catch(err => cb(err));
  }
));

export default authenticate;