import model from '../../db/models';

export const getProfits = ({ userId }) =>
  model.Profit.findAll({
    where: { userId },
    attributes: ['id', 'value', 'description', 'period'],
    include: [
      {
        model: model.Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ],
  });
export const getProfitById = id =>
  model.Profit.find({
    where: { id },
    attributes: ['id', 'value', 'description', 'period'],
    include: [
      {
        model: model.Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ],
  });
export const postProfit = profit => model.Profit.create(profit);
export const deleteProfit = id => model.Profit.destroy({ where: { id } });
export const editProfit = (id, profit) =>
  model.Profit.update(profit, { where: { id } });
