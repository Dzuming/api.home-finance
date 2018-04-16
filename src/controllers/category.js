import resource from 'resource-router-middleware';
import { getCategories } from '../models/category';
import logger from '../lib/logger';

export default () =>
  resource({
    /** GET / - List all entities */
    index({ params }, res) {
      getCategories()
        .then(result => res.json(result))
        .catch(error => logger.error(error));
    },
  });
