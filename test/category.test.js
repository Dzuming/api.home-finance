import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('category', () => {
  beforeEach(function() {
    return models.sequelize.drop().then(() => models.sequelize.sync());
  });
  it('it should GET categories', done => {
    const category = {
      id: 1,
      name: 'Jedzenie',
    };
    models.Category.create(category).then(() => {
      chai
        .request(server)
        .get('/api/categories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.include(category);
          done();
        });
    });
  });
});
