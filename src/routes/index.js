import { Router } from 'express';
import spending, { getSpendingByUser } from '../controllers/spending';
import profit, { getProfitsByUser } from '../controllers/profit';
import user from '../controllers/user';
import authenticate from '../controllers/authenticate';
import category from '../controllers/category';
import { getBudget } from '../controllers/budget';

export default ({config, db}) => {
  let api = Router();

  api.use('/spending', spending({config, db}));

  api.use('/profit', profit({config, db}));
  api.use('/spending/user/:userId', getSpendingByUser);

  api.use('/profit/user/:userId', getProfitsByUser);

  api.use('/user', user());

  api.use('/categories', category());

  api.post('/authenticate', authenticate.token);

  api.get('/budget/:userId', getBudget);

  return api;
}