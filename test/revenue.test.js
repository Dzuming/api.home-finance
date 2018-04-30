import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('revenue', () => {
  beforeEach(function() {
    return models.sequelize
      .drop()
      .then(() => models.sequelize.sync())
      .then(() => models.Category.create({ id: 1, name: 'jedzenie' }));
  });
  it('it should GET revenue', done => {
    const profit = [
      {
        value: 300,
        description: 'test',
        userId: 2,
        categoryId: 1,
        period: '2018-03',
      },
      {
        value: 300,
        description: 'test1',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
      {
        value: 300,
        description: 'test1',
        userId: 2,
        categoryId: 1,
        period: '2018-03',
      },
    ];
    const spending = [
      {
        value: 100.22,
        description: 'test',
        userId: 2,
        categoryId: 1,
        period: '2018-03',
      },
      {
        value: 100.77,
        description: 'test1',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
      {
        value: 100,
        description: 'test1',
        userId: 2,
        categoryId: 1,
        period: '2018-04',
      },
    ];
    const initialData = bluebird.all([
      models.Profit.bulkCreate(profit),
      models.Spending.bulkCreate(spending),
    ]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/revenue/1/2018-04')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql({ revenue: '199.23' });
          done();
        });
    });
  });
});
