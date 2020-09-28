const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../../../../server');
const { Package } = require('../../../../config/database/sequelize');

chai.use(chaiHttp);

const baseUrl = '/packages';

function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const getOne = async ({ status }) => Package.findOne({ where: { status } });

const maxId = async () => Package.max('id');

describe('Package Test Suit', () => {
  describe(`POST ${baseUrl}`, () => {
    it('should create a package. ', async () => {
      const body = {
        order_number: Math.floor(100000 + Math.random() * 900000),
        delivery_company_id: 1,
        awb: `${randomString(10)}`,
        weight: 1,
        value: 1.1,
        created_by: 1,
      };
      const res = await chai.request(server)
        .post(`${baseUrl}`)
        .send(body);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('id');
    });

    it('should give UnProcessableEntity error because order_number can not be blank.', async () => {
      const body = {
        order_number: '',
        delivery_company_id: 1,
        awb: `${randomString(10)}`,
        weight: 1,
        value: 1.1,
        created_by: 1,
      };

      const res = await chai
        .request(server)
        .post(`${baseUrl}`)

        .send(body);

      expect(res.status).to.equal(400);
    });

    it('should give UnProcessableEntity error because awb is not empty', async () => {
      const body = {
        order_number: Math.floor(100000 + Math.random() * 900000),
        delivery_company_id: 1,
        awb: '',
        weight: 1,
        value: 1.1,
        created_by: 1,
      };
      const res = await chai
        .request(server)
        .post(`${baseUrl}`)

        .send(body);

      expect(res.status).to.equal(400);
    });
  });

  describe(`PUT ${baseUrl}/:{packageId}`, () => {
    it('should update a package of given id.', async () => {
      const body = {
        awb: `${randomString(10)}`,
      };
      const packageData = await getOne({
        status: 1,
      });

      const res = await chai.request(server)
        .put(`${baseUrl}/${packageData.id}`)

        .send(body);

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('awb', body.awb);
    });
  });

  describe(`GET ${baseUrl}/`, () => {
    it('should return list of package', async () => {
      const res = await chai.request(server)
        .get(`${baseUrl}/`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('packages');
    });

    it('should return empty list of package because number isActivated is not boolean.', async () => {
      const res = await chai.request(server)
        .get(`${baseUrl}?status=3`);

      expect(res.status).to.equal(400);
    });

    it('should return list of package which contains 111', async () => {
      const res = await chai.request(server)
        .get(`${baseUrl}?search=arp`); // at least 3 char needed

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('packages');
    });
  });

  describe(`GET ${baseUrl}/count`, () => {
    it('should return count of package', async () => {
      const res = await chai.request(server)
        .get(`${baseUrl}/count`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('count');
    });
  });

  describe(`GET ${baseUrl}/{packageId}`, () => {
    it('should return one package of given id.', async () => {
      const packageData = await getOne({
        status: 1,
      });
      const res = await chai.request(server)
        .get(`${baseUrl}/${packageData.id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
    });

    it('should give 404 not found error because data is not exist in DB', async () => {
      const lastRowId = await maxId();
      const res = await chai.request(server)
        .get(`${baseUrl}/${+lastRowId + 1}`); // or Any imaginary number, which should not exists as package id.

      expect(res.status).to.equal(404);
    });
  });

  describe(`PUT ${baseUrl}/:{packageId}?enable=false`, () => {
    it('should disable a package of given id.', async () => {
      const packageData = await getOne({
        status: 1,
      });

      const res = await chai.request(server)
        .put(`${baseUrl}/${packageData.id}?enable=false`);
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('status', 2);
    });

    it('should disable a package of given id.', async () => {
      const packageData = await getOne({
        status: 1,
      });

      const res = await chai.request(server)
        .put(`${baseUrl}/${packageData.id}?enable=false`);
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('status', 2);
    });

    it('should give 412 precondition error because given package is already disabled.', async () => {
      const disabled = await getOne({ status: 2 });
      const res = await chai.request(server)
        .put(`${baseUrl}/${disabled.id}?enable=false`);

      expect(res.status).to.equal(412);
    });
  });

  describe(`PUT ${baseUrl}/:{packageId}?enable=true`, () => {
    it('should activate a package of given package id.', async () => {
      const disabled = await getOne({ status: 2 });
      const res = await chai.request(server)
        .put(`${baseUrl}/${disabled.id}?enable=true`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('status', 1);
    });

    it('should give 412 precondition error because given package is already enabled.', async () => {
      const packageData = await getOne({ status: 1 });
      const res = await chai.request(server)
        .put(`${baseUrl}/${packageData.id}?enable=true`);

      expect(res.status).to.equal(412);
    });
  });
  describe(`DELETE ${baseUrl}/{packageId}`, () => {
    it('should delete one of given id', async () => {
      const packageData = await getOne({
        status: 2,
      });
      const res = await chai.request(server)
        .delete(`${baseUrl}/${packageData.id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('package');
      expect(res.body.data.package).to.have.property('deleted_at');
      expect(res.body.data.package.deleted_at).not.to.equal('null');
    });

    it('should give 412 precondition error because enable package can not be deleted.', async () => {
      const packageData = await getOne({
        status: 1,
      });
      const res = await chai.request(server)
        .delete(`${baseUrl}/${packageData.id}`);

      expect(res.status).to.equal(412);
    });
  });
});
