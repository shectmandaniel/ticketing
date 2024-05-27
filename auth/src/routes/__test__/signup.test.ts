import request from 'supertest';
import { app } from '../../app';
import { signUp } from '../../test/auth-helper';

it('Returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testingEmail@gmail.com',
      password: '1234',
    })
    .expect(201);
});

it('Returns 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testingEmailgmail.com',
      password: '1234',
    })
    .expect(400)
    .then((response) => {
      expect(response.body.errors.length).toEqual(1);
      expect(response.body.errors[0].message).toEqual('Email must be valid');
    });
});

it('Returns 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testingEmail@gmail.com',
      password: '123',
    })
    .expect(400)
    .then((response) => {
      expect(response.body.errors.length).toEqual(1);
      expect(response.body.errors[0].message).toEqual(
        'Password must be between 4 and 20 characters'
      );
    });
});

it('Returns 400 with empty email and password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('Returns 400 when trying to signup with existing email', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'testingEmail@gmail.com',
    password: '1234',
  });

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testingEmail@gmail.com',
      password: '1234',
    })
    .expect(400);
});

it('sets a cookie after signup', async () => {
  await signUp();
});
