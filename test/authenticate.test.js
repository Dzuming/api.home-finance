import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('authenticate', () => {
  before(function () {
    return models.sequelize.sync();
  });

  beforeEach(function () {
    return bluebird.all([
      models.User.destroy({truncate: true})
    ]);
  });
  it('it should AUTHENTICATE all the spending', (done) => {
    const user = {
      name: 'test testowy',
      email: 'test@test.com',
      password: 'testowy'
    };
    models.User.create(user).then(() => {
      chai.request(server)
        .post('/api/authenticate')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.token.should.be.a('string');
          res.body.user.should.be.eql({id: 1, name: 'test testowy', email: 'test@test.com'});
          done();
        });
    });
  });
});