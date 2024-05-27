import request from 'supertest';
import { app } from '../../app';
import { signUp } from '../../test/auth-helper';

it('Clears the cookie after signing out', async () => {
  await signUp();

  const response = await request(app).post('/api/users/signout').expect(200);
  expect((response.get('Set-Cookie') as string[])[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
