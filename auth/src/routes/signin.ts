import express, { Request, Response } from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../modals/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordEqual = await Password.compare(
      existingUser.password,
      password
    );
    if (!isPasswordEqual) {
      throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
