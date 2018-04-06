import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('profits', () => {
  beforeEach(function () {
    return models.sequelize.drop()
      .then(() => models.sequelize.sync())
      .then(() => models.Category.create({id: 1, name: 'jedzenie'})
      );
  });
  it('it should GET all the profits by user and date', (done) => {
    models.Profit.bulkCreate([{
      id: 1, value: 333, description: 'test', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      id: 2, value: 655, description: 'test1', userId: 1, categoryId: 1, period: '2018-03'
    }, {
      id: 3, value: 655, description: 'test1', userId: 2, categoryId: 1, period: '2018-03'
    }
    ]).then(() => {
      chai.request(server)
        .get('/api/profit/1/2018-03')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.eql({
            id: 1,
            value: 333,
            description: 'test',
            category: {id: 1, name: 'jedzenie'},
            period: '2018-03'
          }, {
            id: 2,
            value: 655,
            description: 'test1',
            category: {id: 1, name: 'jedzenie'},
            period: '2018-03'
          });
          done();
        });
    });
  });

  it('it should POST profit', (done) => {
    const profit = {id: 1, value: 1, categoryId: 1, period: '2018-04', userId: 1, description: 'test'};
    chai.request(server)
      .post('/api/profit')
      .set('X-API-Key', 'foobar')
      .send(profit)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.profit.should.be.eql({
          id: 1,
          value: 1,
          period: '2018-04',
          description: 'test',
          category: {
            id: 1,
            name: 'jedzenie'
          }
        });
        res.body.message.should.be.eql(`Dodano zysk o id ${profit.id}`);
        done();
      });
  });

  it('it should belongs to category', (done) => {
    const profit = {id: 1, value: 333, description: 'test', period: '2018-4', userId: 1, categoryId: 1};
    models.Profit.create(profit, {
      include: [{
        model: models.Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    }).then(() => {
      models.Profit.findAll({
        include: [{
          model: models.Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      }).then(result => {
        result[0].dataValues.category.dataValues.should.be.eql({id: 1, name: 'jedzenie'});
        done();
      });
    });
  });
});