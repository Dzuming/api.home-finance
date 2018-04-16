import model from '../../db/models';
import bluebird from 'bluebird';

export const getRevenueFromDb = ({ userId, period }) => {
  const profitSum = model.Profit.sum('value', { where: { userId, period } });
  const spendingSum = model.Spending.sum('value', {
    where: { userId, period },
  });
  return bluebird
    .props({
      profitSum,
      spendingSum,
    })
    .then(result => (result.profitSum || 0) - (result.spendingSum || 0));
};
