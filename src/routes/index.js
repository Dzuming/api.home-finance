import { version } from '../../package.json';
import { Router } from 'express';
import spending from '../controllers/spending';

export default ({ config, db }) => {
  let api = Router();

  // mount the spending resource
  api.use('/spending', spending({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}