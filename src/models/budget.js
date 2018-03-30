import model from '../../db/models';
import bluebird from 'bluebird';

export const getBudgetFromDb = ({userId}) => {
  const profitSum = model.Profit.sum('value', {where: {userId}});
  const spendingSum = model.Spending.sum('value', {where: {userId}});
  return bluebird.props({
    profitSum,
    spendingSum
  }).then(result => (result.profitSum || 0) - (result.spendingSum || 0));
};