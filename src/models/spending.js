import model from '../../db/models';

export const getSpendings = () => model.Spending.findAll();
export const postSpending = spending => model.Spending.create(spending);
export const deleteSpending = id => console.log('ddd');

