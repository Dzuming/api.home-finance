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

  it('it should get all assumptions from all months', done => {
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
      {
        id: 4,
        userId: 1,
        assumptionTypeId: 2,
        percentage: 50,
        isInitialValue: false,
        period: '2018-05',
      },
      {
        id: 5,
        userId: 2,
        assumptionTypeId: 3,
        percentage: 50,
        isInitialValue: false,
        period: '2018-04',
      },
    ];
    const profit = [
      {
        id: 1,
        value: 333,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-04',
      },
      {
        id: 2,
        value: 111.22,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-05',
      },
    ];
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
      {
        id: 5,
        value: 141.22,
        description: 'test',
        userId: 1,
        categoryId: 1,
        period: '2018-05',
      },
      {
        id: 6,
        value: 141.22,
        description: 'test',
        userId: 2,
        categoryId: 1,
        period: '2018-05',
      },
    ];
    const assumptionTypeCategory = [
      {
        assumptionTypeId: 3,
        categoryId: 1,
        period: '2018-04',
      },
      {
        assumptionTypeId: 3,
        categoryId: 2,
        period: '2018-04',
      },
    ];

    const initialData = bluebird.all([
      models.Assumption.bulkCreate(assumption),
      models.Profit.bulkCreate(profit),
      models.AssumptionTypeCategory.bulkCreate(assumptionTypeCategory),
      models.Spending.bulkCreate(spending),
    ]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/assumptions/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.eql([
            {
              name: 'Poduszka bezpieczeństwa',
              value: '66.60',
            },
            {
              name: 'Wakacje',
              value: '88.91',
            },
            {
              name: 'Rachunki',
              value: '695.00',
            },
          ]);
          done();
        });
    });
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
        period: '2018-04',
      },
      {
        assumptionTypeId: 3,
        categoryId: 2,
        period: '2018-04',
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
              value: '66.60',
              limit: '66.60',
            },
            {
              id: 2,
              name: 'Wakacje',
              percentage: 10,
              value: '33.30',
              limit: '33.30',
            },
            {
              id: 3,
              name: 'Rachunki',
              percentage: 50,
              value: '695.00',
              limit: '166.50',
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

    const assumptionTypeCategory = [
      {
        assumptionTypeId: 3,
        categoryId: 1,
        period: '2018-05',
      },
      {
        assumptionTypeId: 3,
        categoryId: 2,
        period: '2018-05',
      },
    ];

    const initialData = bluebird.all([
      models.Assumption.bulkCreate(assumption),
      models.Profit.create(profit),
      models.Spending.bulkCreate(spending),
      models.AssumptionTypeCategory.bulkCreate(assumptionTypeCategory),
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
              value: '66.60',
              limit: '66.60',
            },
            {
              id: 2,
              name: 'Wakacje',
              percentage: 10,
              value: '33.30',
              limit: '33.30',
            },
            {
              id: 3,
              name: 'Rachunki',
              percentage: 50,
              value: '166.50',
              limit: '166.50',
            },
          ]);
          done();
        });
    });
  });

  it('it should get all assumptions from specific month with values if no Spending', done => {
    const assumption = [
      {
        id: 1,
        userId: 1,
        assumptionTypeId: 1,
        percentage: 20,
        isInitialValue: true,
        period: '2018-05',
      },
      {
        id: 2,
        userId: 1,
        assumptionTypeId: 2,
        percentage: 10,
        isInitialValue: true,
        period: '2018-05',
      },
      {
        id: 3,
        userId: 1,
        assumptionTypeId: 3,
        percentage: 50,
        isInitialValue: false,
        period: '2018-05',
      },
    ];
    const profit = {
      id: 1,
      value: 333,
      description: 'test',
      userId: 1,
      categoryId: 1,
      period: '2018-05',
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
        period: '2018-05',
      },
      {
        assumptionTypeId: 3,
        categoryId: 2,
        period: '2018-05',
      },
    ];
    const initialData = bluebird.all([
      models.Assumption.bulkCreate(assumption),
      models.Profit.create(profit),
      models.Spending.bulkCreate(spending),
      models.AssumptionTypeCategory.bulkCreate(assumptionTypeCategory),
    ]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/assumptions/1/2018-05')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.eql([
            {
              id: 1,
              name: 'Poduszka bezpieczeństwa',
              percentage: 20,
              value: '66.60',
              limit: '66.60',
            },
            {
              id: 2,
              name: 'Wakacje',
              percentage: 10,
              value: '33.30',
              limit: '33.30',
            },
            {
              id: 3,
              name: 'Rachunki',
              percentage: 50,
              value: '0.00',
              limit: '166.50',
            },
          ]);
          done();
        });
    });
  });

  it('it should return empty array if no assumptions in database', done => {
    const initialData = bluebird.all([]);

    initialData.then(() => {
      chai
        .request(server)
        .get('/api/assumptions/1/2018-04')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.eql([]);
          done();
        });
    });
  });

  it('it should add assumption', done => {
    const assumption = {
      userId: 1,
      assumptionTypeId: 1,
      percentage: 20,
      isInitialValue: 0,
      period: '2018-04',
      categoryIds: [1, 2],
    };
    chai
      .request(server)
      .post('/api/assumptions')
      .set('X-API-Key', 'foobar')
      .send(assumption)
      .end(async (err, res) => {
        const assumptionTypeCategories = await models.AssumptionTypeCategory.findAll(
          {
            raw: true,
          },
        );
        assumptionTypeCategories[0].should.contains({
          assumptionTypeId: 1,
          categoryId: 1,
          period: '2018-04',
        });
        assumptionTypeCategories[1].should.contains({
          assumptionTypeId: 1,
          categoryId: 2,
          period: '2018-04',
        });
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.contains({
          id: 1,
          userId: 1,
          assumptionTypeId: 1,
          percentage: 20,
          isInitialValue: false,
          period: '2018-04',
        });
        done();
      });
  });

  it('it should add assumption if no category', done => {
    const assumption = {
      userId: 1,
      assumptionTypeId: 1,
      percentage: 20,
      isInitialValue: 0,
      period: '2018-04',
    };
    chai
      .request(server)
      .post('/api/assumptions')
      .set('X-API-Key', 'foobar')
      .send(assumption)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.contains({
          id: 1,
          userId: 1,
          assumptionTypeId: 1,
          percentage: 20,
          isInitialValue: false,
          period: '2018-04',
        });
        done();
      });
  });

  it('it should get all assumptions types', done => {
    models.Assumption.bulkCreate([
      {
        userId: 1,
        assumptionTypeId: 1,
        percentage: 40,
        isInitialValue: 0,
        period: '2018-04',
      },
      {
        userId: 1,
        assumptionTypeId: 1,
        percentage: 10,
        isInitialValue: 0,
        period: '2018-05',
      },
      {
        userId: 1,
        assumptionTypeId: 2,
        percentage: 30,
        isInitialValue: 0,
        period: '2018-05',
      },
    ]).then(() => {
      chai
        .request(server)
        .get('/api/assumptionTypes/1/2018-05')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.contains(
            {
              id: 1,
              name: 'Poduszka bezpieczeństwa',
              isAssigned: true,
            },
            {
              id: 2,
              name: 'Wakacje',
              isAssigned: true,
            },
            {
              id: 3,
              name: 'Rachunki',
              isAssigned: false,
            },
          );
          done();
        });
    });
  });
});
