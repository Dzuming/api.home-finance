import { Router } from 'express';
import spending, {getSpendingByUserAndDate} from '../controllers/spending';
import user from '../controllers/user';
import authenticate from '../controllers/authenticate';

export default ({config, db}) => {
  let api = Router();

  api.use('/spending', spending({config, db}));

  api.use('/spending/:userId/:period', getSpendingByUserAndDate);

  api.use('/user', user());

  api.post('/authenticate', authenticate.token);
  return api;
}