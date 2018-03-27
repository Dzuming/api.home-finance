import model from '../../db/models';

export const getUserByEmailPassword = (email, password) => model.User.findOne({where: {email, password}});

export const getUserByEmail = (email) => model.User.findOne({where: {email}});
