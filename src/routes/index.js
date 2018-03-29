import { Router } from 'express';
import spending, {getSpendingByUserAndDate} from '../controllers/spending';
import user from '../controllers/user';
import authenticate from '../controllers/authenticate';
import category from '../controllers/category';

export default ({config, db}) => {
  let api = Router();

  api.use('/spending', spending({config, db}));

  api.use('/spending/:userId/:period', getSpendingByUserAndDate);

  api.use('/user', user());

  api.use('/categories', category());

  api.post('/authenticate', authenticate.token);
  return api;
}