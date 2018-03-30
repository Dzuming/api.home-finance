import { Router } from 'express';
import spending, { getSpendingByUserAndDate } from '../controllers/spending';
import { getProfitsByUserAndDate } from '../controllers/profit';
import user from '../controllers/user';
import authenticate from '../controllers/authenticate';
import category from '../controllers/category';
import { getBudget } from '../controllers/budget';

export default ({config, db}) => {
  let api = Router();

  api.use('/spending', spending({config, db}));

  api.use('/spending/:userId/:period', getSpendingByUserAndDate);

  api.use('/profits/:userId/:period', getProfitsByUserAndDate);

  api.use('/user', user());

  api.use('/categories', category());

  api.post('/authenticate', authenticate.token);

  api.get('/budget/:userId', getBudget);

  return api;
}