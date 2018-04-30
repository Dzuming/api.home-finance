// pobranie wszsytkich asumpcji z danego miesiąca
// wyliczenie na podstawie procentowych wartości ile trzeba preznaczyc w danym miesiącu na dane przypuszczenie

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import models from '../db/models';
import bluebird from 'bluebird';

let should = chai.should();

chai.use(chaiHttp);
describe('assumption', () => {
  beforeEach(function() {
    return models.sequelize
      .drop()
      .then(() => models.sequelize.sync())
      .then(() =>
        models.Category.bulkCreate([
          { id: 1, name: 'jedzenie' },
          { id: 2, name: 'rachunki' },
        ]),
      )
      .then(() =>
        models.AssumptionType.bulkCreate([
          {
            id: 1,
            name: 'Poduszka bezpieczeństwa',
          },
          {
            id: 2,
            name: 'Wakacje',
          },
          {
            id: 3,
            name: 'Rachunki',
          },
        ]),
      );
  });
  it('it should get all assumptions from specific month with values', done => {
    const assumption = [
      {
        id: 1,
        userId: 1,
        assumptionTypeId: 1,
        percentage: 20,
        isInitialValue: true,
        period: '2018-04',
      },
      {
        id: 2,
        userId: 1,
        assumptionTypeId: 2,
        percentage: 10,
        isInitialValue: true,
        period: '2018-04',
      },
      {
        id: 3,
        userId: 1,
        assumptionTypeId: 3,
        percentage: 50,
        isInitialValue: false,
        period: '2018-04',
      },
    ];
    const profit = {
      id: 1,
      value: 333,
      description: 'test',
      userId: 1,
      categoryId: 1,
      period: '2018-04',
    };
    const spending = [
      {
        id: 1,
        value: 120,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
      {
        id: 2,
        value: 234,
        description: 'test',
        userId: 1,
        categoryId: 2,
        period: '2018-04',
      },
      {
        id: 3,
        value: 3332,
        description: 'test',
        userId: 2,
        categoryId: 1,
        period: '2018-04',
      },
      {
        id: 4,
        value: 341,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
    ];
    const assumptionTypeCategory = [
      {
        assumptionTypeId: 3,
        categoryId: 1,
      },
      {
        assumptionTypeId: 3,
        categoryId: 2,
      },
    ];
    const initialData = bluebird.all([
      models.Assumption.bulkCreate(assumption),
      models.Profit.create(profit),
      models.AssumptionTypeCategory.bulkCreate(assumptionTypeCategory),
      models.Spending.bulkCreate(spending),
    ]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/assumptions/1/2018-04')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.eql([
            {
              id: 1,
              name: 'Poduszka bezpieczeństwa',
              percentage: 20,
              value: 66.6,
            },
            {
              id: 2,
              name: 'Wakacje',
              percentage: 10,
              value: 33.3,
            },
            {
              id: 3,
              name: 'Rachunki',
              percentage: 50,
              value: 695,
            },
          ]);
          done();
        });
    });
  });

  it('it should get all assumptions from specific month with values if no assuptionsCategory', done => {
    const assumption = [
      {
        id: 1,
        userId: 1,
        assumptionTypeId: 1,
        percentage: 20,
        isInitialValue: true,
        period: '2018-04',
      },
      {
        id: 2,
        userId: 1,
        assumptionTypeId: 2,
        percentage: 10,
        isInitialValue: true,
        period: '2018-04',
      },
      {
        id: 3,
        userId: 1,
        assumptionTypeId: 3,
        percentage: 50,
        isInitialValue: false,
        period: '2018-04',
      },
    ];
    const profit = {
      id: 1,
      value: 333,
      description: 'test',
      userId: 1,
      categoryId: 1,
      period: '2018-04',
    };
    const spending = [
      {
        id: 1,
        value: 120,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
      {
        id: 2,
        value: 234,
        description: 'test',
        userId: 1,
        categoryId: 2,
        period: '2018-04',
      },
      {
        id: 3,
        value: 3332,
        description: 'test',
        userId: 2,
        categoryId: 1,
        period: '2018-04',
      },
      {
        id: 4,
        value: 341,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
    ];
    const initialData = bluebird.all([
      models.Assumption.bulkCreate(assumption),
      models.Profit.create(profit),
      models.Spending.bulkCreate(spending),
    ]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/assumptions/1/2018-04')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.eql([
            {
              id: 1,
              name: 'Poduszka bezpieczeństwa',
              percentage: 20,
              value: 66.6,
            },
            {
              id: 2,
              name: 'Wakacje',
              percentage: 10,
              value: 33.3,
            },
            {
              id: 3,
              name: 'Rachunki',
              percentage: 50,
              value: 166.5,
            },
          ]);
          done();
        });
    });
  });
});