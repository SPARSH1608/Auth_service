const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const { AuthRequestValidator } = require('../../middlewares/index');
router.post(
  '/signup',
  AuthRequestValidator.validateAuth,
  UserController.create
);
router.post(
  '/signin',
  AuthRequestValidator.validateAuth,
  UserController.signIn
);

router.get('/isAuthenticated', UserController.isAuthenticated);
module.exports = router;
