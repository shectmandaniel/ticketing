import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
  res.send('Sign Out Route');
});

export { router as signoutRouter };
