import model from '../../db/models';
import bluebird from 'bluebird';

export const assumptionCalculation = ({ userId, period }) => {
  const assumptions = getAssumptionsFromDb({ userId, period });
  const profitSum = model.Profit.sum('value', { where: { userId, period } });
  return bluebird.props({ assumptions, profitSum });
};

export const assumptionMap = (assumption, profitSum) => ({
  id: assumption.id,
  name: assumption.AssumptionType.name,
  percentage: assumption.percentage,
  value: profitSum * assumption.percentage * 0.01,
});

const getAssumptionsFromDb = ({ userId, period }) =>
  model.Assumption.findAll({
    where: { userId, period },
    attributes: ['id', 'percentage', 'isInitialValue'],
    include: [
      {
        model: model.AssumptionType,
        attributes: ['name'],
      },
    ],
  });
