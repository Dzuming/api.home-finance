import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('spending', () => {
  before(function () {
    return models.sequelize.sync();
  });

  beforeEach(function () {
    return bluebird.all([
      models.Spending.destroy({truncate: true})
    ]);
  });
  it('it should GET all the spending by user and date', (done) => {
    models.Spending.bulkCreate([{
      value: 333, description: 'test', categoryId:1,  userId: 1, period: '2018-03'
    }, {
      value: 655, description: 'test1', categoryId:1, userId: 1, period: '2018-03'
    }, {
      value: 655, description: 'test1', categoryId:1, userId: 2, period: '2018-03'
    }
    ]).then(() => {
      chai.request(server)
        .get('/api/spending/1/2018-03')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.include({
            value: 333,
            description: 'test',
            userId: 1,
            categoryId:1,
            period: '2018-03'
          }, {
            value: 655,
            description: 'test1',
            userId: 1,
            categoryId:1,
            period: '2018-03'
          });
          done();
        });
    });
  });

  it('it should POST spending', (done) => {
    const spending = {value: 1, description: 'test'};
    chai.request(server)
      .post('/api/spending')
      .set('X-API-Key', 'foobar')
      .send(spending)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.eql(spending);
        done();
      });
  });

  it('it should REMOVE spending', (done) => {
    const newSpending = {id: 1, value: 333, description: 'test'};

    models.Spending.create(newSpending).then(() => {
      chai.request(server)
        .delete('/api/spending/1')
        .end((err, res) => {
          models.Spending.findAll().then(spendings => {
            res.should.have.status(200);
            spendings.should.be.eql([]);
            res.body.should.be.eql({id: '1'});
            done();
          });
        });
    });
  });

  it('it should EDIT spending', (done) => {
    const editResult = {value: 331, description: 'test1'};
    models.Spending.create({id: 1, value: 333, description: 'test'}).then(() => {
      chai.request(server)
        .put('/api/spending/1')
        .set('X-API-Key', 'foobar')
        .send(editResult)
        .end((err, res) => {
          models.Spending.findAll().then(spendings => {
            res.should.have.status(200);
            spendings[0].dataValues.should.be.include(editResult);
            done();
          });
        });
    });
  });
});