import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('profits', () => {
  before(function () {
    return models.sequelize.sync();
  });

  beforeEach(function () {
    return bluebird.all([
      models.Profit.destroy({truncate: true})
    ]);
  });
  it('it should GET all the profits by user and date', (done) => {
    models.Profit.bulkCreate([{
      value: 333, description: 'test', userId: 1, period: '2018-03'
    }, {
      value: 655, description: 'test1', userId: 1, period: '2018-03'
    }, {
      value: 655, description: 'test1', userId: 2, period: '2018-03'
    }
    ]).then(() => {
      chai.request(server)
        .get('/api/profits/1/2018-03')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.include({
            value: 333,
            description: 'test',
            userId: 1,
            period: '2018-03'
          }, {
            value: 655,
            description: 'test1',
            userId: 1,
            period: '2018-03'
          });
          done();
        });
    });
  });
});