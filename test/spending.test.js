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
  it('it should GET all the spending', (done) => {
    models.Spending.create({value: 333, description: 'test'}).then(() => {
      chai.request(server)
        .get('/api/spending')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
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

});