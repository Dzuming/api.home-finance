import model from '../../db/models';
import bluebird from 'bluebird';

export const getAssumptionsFromPeriod = ({ userId, period }) =>
  new Promise(resolve =>
    assumptionCalculation({ userId, period }).then(
      ({ assumptions, profitSum }) => {
        assumptionMap(assumptions, profitSum, userId, period).then(
          mappedAssumptions => {
            mapValueForCategoryAssumptions(
              mappedAssumptions,
              userId,
              period,
            ).then(assumptions => resolve(assumptions));
          },
        );
      },
    ),
  );

const assumptionCalculation = ({ userId, period }) => {
  const assumptions = getAssumptionsFromDb({ userId, period });
  const profitSum = model.Profit.sum('value', { where: { userId, period } });
  return bluebird.props({ assumptions, profitSum });
};

const assumptionMap = (assumptions, profitSum, userId, period) => {
  return bluebird.map(assumptions, assumption => {
    return getAssumptionCategoryFromDb(assumption.id).then(
      categoryAssumptions => {
        return {
          id: assumption.id,
          name: assumption.AssumptionType.name,
          percentage: assumption.percentage,
          value: profitSum * assumption.percentage * 0.01,
          categoryAssumptions: categoryAssumptions,
        };
      },
    );
  });
};

const mapValueForCategoryAssumptions = (mappedAssumptions, userId, period) => {
  return new Promise(resolve =>
    bluebird.map(mappedAssumptions, mappedAssumption => {
      if (mappedAssumption.categoryAssumptions.length > 0) {
        sumCategorySpending(mappedAssumption, userId, period).then(result => {
          console.log('result');
          mappedAssumption.value = result;
          mappedAssumptions.map(
            mappedAssumption => delete mappedAssumption.categoryAssumptions,
          );
          resolve(mappedAssumptions);
        });
      }
    }),
  );
};

const sumCategorySpending = (mappedAssumption, userId, period) =>
  bluebird
    .reduce(
      mappedAssumption.categoryAssumptions,
      (total, categoryAssumption) => {
        return getSpendingByCategoryFromDb(
          categoryAssumption.categoryId,
          userId,
          period,
        ).then(value => {
          return total + parseInt(value, 10);
        });
      },
      0,
    )
    .then(spendingCategorySum => spendingCategorySum);

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

const getAssumptionCategoryFromDb = assumptionId =>
  model.AssumptionCategory.findAll({
    where: { assumptionId },
    attributes: ['assumptionId', 'categoryId'],
  });

const getSpendingByCategoryFromDb = (categoryId, userId, period) =>
  model.Spending.sum('value', {
    where: { categoryId, userId, period },
  });
