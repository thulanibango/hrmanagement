const express = require('express');
const { check } = require('express-validator');

const usersControllers = require("../controller/users-controller")
const router = express.Router();

router.get('/', usersControllers.getUsers);
router.get('/:uid',usersControllers.getUserById)
router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() 
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
  usersControllers.signup
);
router.post(
    '/create',
    [
      check('name')
        .not()
        .isEmpty(),
      check('email'),
      check('password')
        .not()
        .isEmpty()
    ],
    usersControllers.createUser
  );
  
  router.patch(
    '/:uid',
    [
      check('name')
        .not()
        .isEmpty(),
      check('email')
    ],
    usersControllers.updateUser
  );
router.post('/login', usersControllers.login);
router.delete('/:uid', usersControllers.deleteUser);

module.exports =router;