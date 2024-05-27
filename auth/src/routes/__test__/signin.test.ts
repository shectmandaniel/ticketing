import request from 'supertest';
import { app } from '../../app';

it('Returns 200 on successful signing', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '12345@gmail.com',
      password: '1234',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: '12345@gmail.com',
      password: '1234',
    })
    .expect(200);
});

it('Fails when a email that does not exist is given', async () => {
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: '12345@gmail.com',
      password: '1234',
    })
    .expect(400);

  expect(response.body.errors[0].message).toEqual('Invalid credentials');
});

it('Fails when incorrect password is given', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '12345@gmail.com',
      password: '1234',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: '12345@gmail.com',
      password: '12345',
    })
    .expect(400);

  expect(response.body.errors[0].message).toEqual('Invalid credentials');
});

it('sets a cookie after signing', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'testingEmail@gmail.com',
    password: '1234',
  });

  const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'testingEmail@gmail.com',
        password: '1234',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
