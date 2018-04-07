import model from '../../db/models';

export const getUserByEmail = (email) => model.User.findOne({where: {email}});
