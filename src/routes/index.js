import { Router } from 'express';
import spending from '../controllers/spending';
import authenticate from '../controllers/authenticate';

export default ({config, db}) => {
  let api = Router();

  // mount the spending resource
  api.use('/spending', spending({config, db}));

  api.post('/authenticate', authenticate.token);
  return api;
}