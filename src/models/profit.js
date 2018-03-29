import model from '../../db/models';

export const getProfits = ({userId, period}) => model.Profit.findAll({where: {userId, period}});

