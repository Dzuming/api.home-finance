import passport from 'passport';
import jwt from 'jsonwebtoken';
import setting from '../config';
import logger from '../lib/logger';

const authenticate = {
  token: (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        logger.error(info);
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          logger.error(err);
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const userData = user.dataValues;
        const token = jwt.sign(userData, setting.secret);
        return res.json({ token });
      });
    })(req, res);
  },
};

export default authenticate;
