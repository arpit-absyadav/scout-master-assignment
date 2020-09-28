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

it('', () => {
  // expect(true).toEqual(true);s
});
// describe('User Test Suit', async () => {
// describe(`POST ${baseUrl}`, () => {
//   it('should create a user. ', async () => {
//     const body = {
//       name: `${randomString(10)}`,
//       description: '80000000000',
//     };
//     const res = await chai.request(server)
//       .post(`${baseUrl}`)

//       .send(body);

//     expect(res.status).toEqual(201);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//     expect(res.body.data.user).toHaveProperty('id');
//   });

//   it('should give UnProcessableEntity error because name can not be blank.', async () => {
//     const body = {
//       name: '',
//     };

//     const res = await chai
//       .request(server)
//       .post(`${baseUrl}`)

//       .send(body);

//     expect(res.status).toEqual(400);
//   });

//   it('should give UnProcessableEntity error because name is not string.', async () => {
//     const body = {
//       name: 123,
//     };

//     const res = await chai
//       .request(server)
//       .post(`${baseUrl}`)

//       .send(body);

//     expect(res.status).toEqual(400);
//   });
// });

// describe(`PUT ${baseUrl}/:{packageId}`, () => {
//   it('should update a user of given id.', async () => {
//     const updatedName = `Updated${randomString(10)}`;
//     const body = {
//       name: updatedName,
//     };
//     const user = await getOne({
//       status: 1,
//     });

//     const res = await chai.request(server)
//       .put(`${baseUrl}/${user.id}`)

//       .send(body);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//     expect(res.body.data.user).toHaveProperty('name', body.name);
//   });
// });

// describe(`GET ${baseUrl}/`, () => {
//   it('should return list of user', async () => {
//     const res = await chai.request(server)
//       .get(`${baseUrl}/`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('users');
//   });

//   it('should return empty list of user because number isActivated is not boolean.', async () => {
//     const res = await chai.request(server)
//       .get(`${baseUrl}?status=3`);

//     expect(res.status).toEqual(400);
//   });

//   it('should return list of user which contains 111', async () => {
//     const res = await chai.request(server)
//       .get(`${baseUrl}?search=arp`); // at least 3 char needed

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('users');
//   });
// });

// describe(`GET ${baseUrl}/count`, () => {
//   it('should return count of user', async () => {
//     const res = await chai.request(server)
//       .get(`${baseUrl}/count`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('count');
//   });
// });

// describe(`GET ${baseUrl}/{packageId}`, () => {
//   it('should return one user of given id.', async () => {
//     const user = await getOne({
//       status: 1,
//     });
//     const res = await chai.request(server)
//       .get(`${baseUrl}/${user.id}`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//   });

//   it('should give 404 not found error because data is not exist in DB', async () => {
//     const lastRowId = await maxId();
//     const res = await chai.request(server)
//       .get(`${baseUrl}/${+lastRowId + 1}`); // or Any imaginary number, which should not exists as user id.

//     expect(res.status).toEqual(404);
//   });
// });

// describe(`DELETE ${baseUrl}/{packageId}`, () => {
//   it('should delete one of given id', async () => {
//     const user = await getOne({
//       status: 2,
//     });
//     const res = await chai.request(server)
//       .delete(`${baseUrl}/${user.id}`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//     expect(res.body.data.user).toHaveProperty('deleted_at');
//     expect(res.body.data.user.deleted_at).not.toEqual('null');
//   });

//   it('should give 412 precondition error because enable user can not be deleted.', async () => {
//     const user = await getOne({
//       status: 1,
//     });
//     const res = await chai.request(server)
//       .delete(`${baseUrl}/${user.id}`);

//     expect(res.status).toEqual(412);
//   });
// });

// describe(`PUT ${baseUrl}/:{packageId}?enable=false`, () => {
//   it('should disable a user of given id.', async () => {
//     const user = await getOne({
//       status: 1,
//     });

//     const res = await chai.request(server)
//       .put(`${baseUrl}/${user.id}?enable=false`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//     expect(res.body.data.user).toHaveProperty('status', 2);
//   });

//   it('should give 412 precondition error because given user is already disabled.', async () => {
//     const disabled = await getOne({ status: 2 });
//     const res = await chai.request(server)
//       .put(`${baseUrl}/${disabled.id}?enable=false`);

//     expect(res.status).toEqual(412);
//   });
// });

// describe(`PUT ${baseUrl}/:{packageId}?enable=true`, () => {
//   it('should activate a user of given user id.', async () => {
//     const disabled = await getOne({ status: 2 });
//     const res = await chai.request(server)
//       .put(`${baseUrl}/${disabled.id}?enable=true`);

//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty('data');
//     expect(res.body.data).toHaveProperty('user');
//     expect(res.body.data.user).toHaveProperty('status', 1);
//   });

//   it('should give 412 precondition error because given user is already enabled.', async () => {
//     const user = await getOne({ status: 1 });
//     const res = await chai.request(server)
//       .put(`${baseUrl}/${user.id}?enable=true`);

//     expect(res.status).toEqual(412);
//   });
// });
