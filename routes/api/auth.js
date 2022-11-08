const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapp } = require('../../helpers');

const { validBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validBody(schemas.signupSchema), ctrlWrapp(ctrl.signup));

router.get('/verify/:verificationToken', ctrlWrapp(ctrl.verify));

router.post(
  '/verify',
  validBody(schemas.emailVerifSchema),
  ctrlWrapp(ctrl.resendVerif)
);

router.post('/signin', validBody(schemas.signinSchema), ctrlWrapp(ctrl.signin));

router.get('/current', authenticate, ctrlWrapp(ctrl.current));

router.get('/logout', authenticate, ctrlWrapp(ctrl.logout));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapp(ctrl.avatar)
);

module.exports = router;
