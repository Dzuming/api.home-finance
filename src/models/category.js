import model from '../../db/models';

export const getCategories = () => model.Category.findAll();