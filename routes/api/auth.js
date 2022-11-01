const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapp } = require('../../helpers');

const { validBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validBody(schemas.signupSchema), ctrlWrapp(ctrl.signup));
router.post('/signin', validBody(schemas.signinSchema), ctrlWrapp(ctrl.signin));

module.exports = router;
