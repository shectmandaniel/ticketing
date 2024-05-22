import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Current User Route');
});

export { router as currentUserRouter };
