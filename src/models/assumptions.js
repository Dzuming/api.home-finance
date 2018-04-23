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

const assumptionMap = (assumptions, profitSum, userId, period) => {
  return bluebird.map(assumptions, assumption => {
    return getAssumptionCategoryFromDb(assumption.id)
      .then(categoryAssumptions => {
        return {
          id: assumption.id,
          name: assumption.AssumptionType.name,
          percentage: assumption.percentage,
          value: profitSum * assumption.percentage * 0.01,
          categoryAssumptions: categoryAssumptions,
        };
      })
      .catch(error => logger.error(error));
  });
};

const mapValueForCategoryAssumptions = (mappedAssumptions, userId, period) => {
  return new Promise(resolve =>
    bluebird.map(mappedAssumptions, (mappedAssumption, index) => {
      sumCategorySpending(mappedAssumption, userId, period).then(result => {
        const isArrayGreterThanZero =
          Array.isArray(mappedAssumption.categoryAssumptions) &&
          mappedAssumption.categoryAssumptions.length > 0;
        if (isArrayGreterThanZero) {
          mappedAssumption.value = result;
        }
        const isLastMappedElement = index === mappedAssumptions.length - 1;
        if (isLastMappedElement) {
          deleteParamFromObject(mappedAssumptions, 'categoryAssumptions');
          resolve(mappedAssumptions);
        }
      });
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
