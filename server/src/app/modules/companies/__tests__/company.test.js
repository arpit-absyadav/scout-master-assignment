const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/companies';

describe(`GET ${baseUrl}/`, () => {
  it('should return list of companies', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}/`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data').to.be.an('object');
    expect(res.body.data).to.have.property('companies').to.be.an('array');
  });

  it('should return empty list of user because number isActivated is not boolean.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?status=3`);

    expect(res.status).to.equal(400);
  });

  it('should return list of user which contains 111', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?search=arp`); // at least 3 char needed

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data').to.be.an('object');
    expect(res.body.data).to.have.property('companies').to.be.an('array');
  });

  it('should give UnProcessableEntity error because parameters [sort_by] can not be empty.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?sort_by=`);

    expect(res.status).to.equal(400);
  });

  it('should give UnProcessableEntity error because page_no can not be a garbage value.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?page_no=@#78sdac`);

    expect(res.status).to.equal(400);
  });

  it('should give UnProcessableEntity error because page_no can not be a string.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?page_no=abc`);

    expect(res.status).to.equal(400);
  });
});
