import model from '../../db/models';
import bluebird from 'bluebird';
import logger from '../lib/logger';
import { deleteParamFromObject } from '../lib/util';

export const getAssumptionsFromPeriod = ({ userId, period }) =>
  new Promise(resolve =>
    assumptionCalculation({ userId, period })
      .then(({ assumptions, profitSum }) => {
        assumptionMap(assumptions, profitSum, userId, period)
          .then(mappedAssumptions => {
            mapValueForCategoryAssumptions(mappedAssumptions, userId, period)
              .then(assumptions => resolve(assumptions))
              .catch(error => logger.error(error));
          })
          .catch(error => logger.error(error));
      })
      .catch(error => logger.error(error)),
  );

const assumptionCalculation = ({ userId, period }) => {
  const assumptions = getAssumptionsFromDb({ userId, period });
  const profitSum = model.Profit.sum('value', { where: { userId, period } });
  return bluebird.props({ assumptions, profitSum });
};

const assumptionMap = (assumptions, profitSum) => {
  return bluebird.map(assumptions, assumption => {
    return getAssumptionCategoryFromDb(assumption.AssumptionType.id)
      .then(categoryTypeAssumptions => {
        return {
          id: assumption.id,
          name: assumption.AssumptionType.name,
          percentage: assumption.percentage,
          value: (profitSum * assumption.percentage * 0.01).toFixed(2),
          limit: (profitSum * assumption.percentage * 0.01).toFixed(2),
          categoryTypeAssumptions,
        };
      })
      .catch(error => logger.error(error));
  });
};

const mapValueForCategoryAssumptions = (mappedAssumptions, userId, period) => {
  let index = 0;
  return new Promise(resolve => {
    if (mappedAssumptions.length === 0) {
      resolve([]);
    }
    return bluebird.map(mappedAssumptions, mappedAssumption => {
      sumCategorySpending(mappedAssumption, userId, period).then(result => {
        const isArrayGreaterThanZero =
          Array.isArray(mappedAssumption.categoryTypeAssumptions) &&
          mappedAssumption.categoryTypeAssumptions.length > 0;
        if (isArrayGreaterThanZero) {
          mappedAssumption.value = result.toFixed(2);
        }
        index++;
        const isLastMappedElement = index === mappedAssumptions.length;
        if (isLastMappedElement) {
          deleteParamFromObject(mappedAssumptions, 'categoryTypeAssumptions');
          resolve(mappedAssumptions);
        }
      });
    });
  });
};

const sumCategorySpending = (mappedAssumption, userId, period) => {
  return bluebird
    .reduce(
      mappedAssumption.categoryTypeAssumptions,
      (total, categoryAssumption) => {
        return getSpendingByCategoryFromDb(
          categoryAssumption.categoryId,
          userId,
          period,
        )
          .then(value => {
            return total + parseInt(value, 10);
          })
          .catch(error => logger.error(error));
      },
      0,
    )
    .then(spendingCategorySum => spendingCategorySum)
    .catch(error => logger.error(error));
};

const getAssumptionsFromDb = ({ userId, period }) =>
  model.Assumption.findAll({
    where: { userId, period },
    attributes: ['id', 'percentage', 'isInitialValue'],
    include: [
      {
        model: model.AssumptionType,
        attributes: ['id', 'name'],
      },
    ],
  });

const getAssumptionCategoryFromDb = assumptionTypeId =>
  model.AssumptionTypeCategory.findAll({
    where: { assumptionTypeId },
    attributes: ['assumptionTypeId', 'categoryId'],
  });

const getSpendingByCategoryFromDb = (categoryId, userId, period) =>
  model.Spending.sum('value', {
    where: { categoryId, userId, period },
  });
