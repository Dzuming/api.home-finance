import resource from 'resource-router-middleware';
import { getCategories } from '../models/category';

export default () => resource({
    /** GET / - List all entities */
    index ({params}, res) {
      getCategories().then(result => res.json(result));
    },
  }
);