import model from '../../db/models';

export const getProfits = ({userId, period}) => model.Profit.findAll({
  where: {userId, period},
  attributes: ['value', 'description', 'period'],
  include: [{
    model: model.Category,
    as: 'category',
    attributes: ['id', 'name']
  }]
});

