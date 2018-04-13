import dev from './dev.env';
import test from './test.env';

const settings = () => {
  if (process.env.NODE_ENV === 'test') {
    return test;
  } else {
    return dev;
  }
};
export default settings();
