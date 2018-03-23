import { Router } from 'express';
import spending from '../controllers/spending';

export default ({config, db}) => {
  let api = Router();

  // mount the spending resource
  api.use('/spending', spending({config, db}));

  return api;
}