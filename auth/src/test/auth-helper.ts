import request from 'supertest';
import { app } from '../app';

export const signUp = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = signupResponse.get('Set-Cookie');
  if (!cookie) {
    fail();
  }

  return cookie;
};
