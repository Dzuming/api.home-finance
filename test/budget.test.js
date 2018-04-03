import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('budget', () => {

  beforeEach(function () {
    return models.sequelize.drop()
      .then(() => models.sequelize.sync())
      .then(() => models.Category.create({id: 1, name: 'jedzenie'})
      );
  });
  it('it should GET budget', (done) => {
    const profit = [{
      value: 300, description: 'test', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 300, description: 'test1', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 300, description: 'test1', userId: 2, categoryId: 1, period: '2018-03'
    }];
    const spending = [{
      value: 100, description: 'test', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 2, categoryId: 1, period: '2018-03'
    }];
    const initialData = bluebird.all([
      models.Profit.bulkCreate(profit),
      models.Spending.bulkCreate(spending)
    ]);

    initialData.then(() => {
      chai.request(server)
        .get('/api/budget/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({budget: 400});
          done();
        });
    });
  });

  it('it should GET budget if no profits', (done) => {
    const spending = [{
      value: 100, description: 'test', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 2, categoryId: 1, period: '2018-03'
    }];
    const initialData = bluebird.all([
      models.Spending.bulkCreate(spending)
    ]);

    initialData.then(() => {
      chai.request(server)
        .get('/api/budget/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({budget: -200});
          done();
        });
    });
  });

  it('it should GET budget if no spendings', (done) => {
    const profit = [{
      value: 100, description: 'test', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      value: 100, description: 'test1', userId: 2, categoryId: 1, period: '2018-03'
    }];
    const initialData = bluebird.all([
      models.Profit.bulkCreate(profit)
    ]);

    initialData.then(() => {
      chai.request(server)
        .get('/api/budget/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({budget: 200});
          done();
        });
    });
  });
});