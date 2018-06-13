import model from '../../db/models';
import bluebird from 'bluebird';
import { deleteParamFromObject } from '../lib/util';

export const createAssumption = async assumption => {
  const newAssumption = await saveAssumption(assumption);
  if (Array.isArray(assumption.categoryIds)) {
    assumption.categoryIds.map(
      async categoryId =>
        await saveAssumptionTypeCategory({
          assumptionTypeId: assumption.assumptionTypeId,
          categoryId,
          period: assumption.period,
        }),
    );
  }

  return newAssumption;
};

const saveAssumption = assumption =>
  model.Assumption.create(assumption, { raw: true });

const saveAssumptionTypeCategory = ({ assumptionTypeId, categoryId, period }) =>
  model.AssumptionTypeCategory.create({ assumptionTypeId, categoryId, period });

export const sumAssumptions = async ({ userId }) => {
  const periods = await getPeriodsFromDb();
  const assumptions = await bluebird.map(periods, value =>
    getAssumptionsFromPeriod({
      userId,
      period: value.period,
    }),
  );
  const flattenArray = [].concat.apply([], assumptions);
  return await sumSimilarAssumptions(flattenArray);
};

const sumSimilarAssumptions = async flattenArray => {
  let sum = [];
  await bluebird.map(flattenArray, assumption => {
    let existing = sum.filter(function(assumptionSum) {
      return assumptionSum.name === assumption.name;
    })[0];

    if (!existing) {
      sum.push({
        name: assumption.name,
        value: assumption.value,
      });
    } else {
      existing.value = parseFloat(existing.value);
      existing.value += parseFloat(assumption.value);
      existing.value = existing.value.toFixed(2);
    }
  });
  return sum;
};

export const getAssumptionsFromPeriod = async ({ userId, period }) => {
  const { assumptions, profitSum } = await assumptionCalculation({
    userId,
    period,
  });
  const mappedAssumptions = await assumptionMap(assumptions, profitSum, period);
  return await setCategoriesValueToAssumption(
    mappedAssumptions,
    userId,
    period,
  );
};

export const getAssumptionTypesFromPeriod = async ({ userId, period }) => {
  const assumptionTypes = await model.AssumptionType.findAll();
  const assumptions = await getAssumptionsFromDb({ userId, period });
  return assumptionTypes.map(assumptionType => {
    assumptionType.dataValues.isAssigned = assumptions.some(
      assumption => assumptionType.id === assumption.AssumptionType.id,
    );
    return assumptionType;
  });
};

const assumptionCalculation = ({ userId, period }) => {
  const assumptions = getAssumptionsFromDb({ userId, period });
  const profitSum = model.Profit.sum('value', { where: { userId, period } });
  return bluebird.props({ assumptions, profitSum });
};

const assumptionMap = (assumptions, profitSum, period) =>
  bluebird.map(assumptions, async assumption => {
    const categoryTypeAssumptions = await getAssumptionCategoryWithPeriodFromDb(
      assumption.AssumptionType.id,
      period,
    );
    const value = profitSum * assumption.percentage * 0.01;
    return {
      id: assumption.id,
      name: assumption.AssumptionType.name,
      percentage: assumption.percentage,
      value: !isNaN(value) ? value.toFixed(2) : 0,
      limit: !isNaN(value) ? value.toFixed(2) : 0,
      categoryTypeAssumptions,
    };
  });

const setCategoriesValueToAssumption = async (
  mappedAssumptions,
  userId,
  period,
) => {
  if (mappedAssumptions.length === 0) {
    return [];
  }
  await bluebird.map(mappedAssumptions, async assumption => {
    const sumSpendingByCategory = await sumCategorySpending(
      assumption,
      userId,
      period,
    );
    const isArrayGreaterThanZero =
      Array.isArray(assumption.categoryTypeAssumptions) &&
      assumption.categoryTypeAssumptions.length > 0;
    if (isArrayGreaterThanZero) {
      assumption.value = sumSpendingByCategory.toFixed(2);
    }
  });
  deleteParamFromObject(mappedAssumptions, 'categoryTypeAssumptions');
  return mappedAssumptions;
};

const sumCategorySpending = (mappedAssumption, userId, period) => {
  return bluebird.reduce(
    mappedAssumption.categoryTypeAssumptions,
    async (total, categoryAssumption) => {
      let spendingByCategory = await getSpendingByCategoryFromDb(
        categoryAssumption.categoryId,
        userId,
        period,
      );
      spendingByCategory = isNaN(spendingByCategory)
        ? 0
        : parseInt(spendingByCategory, 10);
      return total + spendingByCategory;
    },
    0,
  );
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

const getAssumptionCategoryWithPeriodFromDb = (assumptionTypeId, period) =>
  model.AssumptionTypeCategory.findAll({
    where: { assumptionTypeId, period },
    attributes: ['assumptionTypeId', 'categoryId'],
  });

const getSpendingByCategoryFromDb = (categoryId, userId, period) =>
  model.Spending.sum('value', {
    where: { categoryId, userId, period },
  });

const getPeriodsFromDb = () =>
  model.Assumption.findAll({
    raw: true,
    attributes: ['period'],
    group: ['period'],
  });
