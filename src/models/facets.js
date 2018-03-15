import { dbQueryPromise } from '../lib/util';

export const facets = () => (
  dbQueryPromise('SELECT * FROM categories')
);

