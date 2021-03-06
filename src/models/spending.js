import model from '../../db/models';
import category from '../controllers/category';

export const getSpendings = ({ userId }) =>
  model.Spending.findAll({
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
export const getSpendingById = id =>
  model.Spending.find({
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
export const postSpending = spending => model.Spending.create(spending);
export const deleteSpending = id => model.Spending.destroy({ where: { id } });
export const editSpending = (id, spending) =>
  model.Spending.update(spending, { where: { id } });
