import { Router } from 'express';
import expressJwt from 'express-jwt';
import setting from '../config';

const checkIfRouterAuth = () => {
  const pubicEndpoints = ['/api/authenticate'];
  return expressJwt({secret: setting.secret}).unless({path: pubicEndpoints});
};

export default () => {
  let routes = Router();
  if (process.env.NODE_ENV !== 'test') {
    routes.use(checkIfRouterAuth());
  }
  return routes;
}
