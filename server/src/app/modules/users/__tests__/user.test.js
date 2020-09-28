const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');

chai.use(chaiHttp);

const baseUrl = '/users';
describe(`GET ${baseUrl}/`, () => {
  it('should return list of user', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}/`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('users');
  });

  it('should return empty list of user because number isActivated is not boolean.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?status=3`);

    expect(res.status).toEqual(400);
  });

  it('should return list of user which contains 111', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?search=arp`); // at least 3 char needed

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('users');
  });

  it('should give UnProcessableEntity error because parameters [sort_by] can not be empty.', async () => {
    const res = await chai.request(server)
      .get(`${baseUrl}?sort_by=`);

    expect(res.status).toEqual(400);
  });

  it('should give UnProcessableEntity error because page_no can not be a garbage value.', async () => {
    const res = await chai
      .request(server)
      .get(`${baseUrl}?page_no=@#78sdac`);

    expect(res.status).toEqual(400);
  });

  it('should give UnProcessableEntity error because page_no can not be a string.', async () => {
    const res = await chai
      .request(server)
      .get(`${baseUrl}?page_no=abc`);

    expect(res.status).toEqual(400);
  });

  it('should give UnProcessableEntity error because duplicate parameters are not allowed.', async () => {
    const res = await chai
      .request(server)
      .get(`${baseUrl}?sort_by=_id&page_no=1&sort_by=_id`);

    expect(res.status).toEqual(400);
  });
});
