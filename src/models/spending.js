import model from '../../db/models';

export const spending = () => model.Spending.findAll();

