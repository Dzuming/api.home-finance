import model from '../../db/models';

export const getSpendings = () => model.Spending.findAll();
export const postSpending = spending => model.Spending.create(spending);
export const deleteSpending = id => model.Spending.destroy({where: {id}});
export const editSpending = (id, spending) => model.Spending.update(
  spending,
  {where: {id}}
);

