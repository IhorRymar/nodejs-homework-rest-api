const express = require('express');

const ctrl = require('../../controllers');

const { ctrlWrapp } = require('../../helpers');

const { validBody, isValidId, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapp(ctrl.listContacts));

router.get('/:id', authenticate, isValidId, ctrlWrapp(ctrl.getById));

router.post(
  '/',
  authenticate,
  validBody(schemas.addSchema),
  ctrlWrapp(ctrl.addContact)
);

router.delete('/:id', authenticate, isValidId, ctrlWrapp(ctrl.removeById));

router.put(
  '/:id',
  authenticate,
  isValidId,
  validBody(schemas.addSchema),
  ctrlWrapp(ctrl.updateById)
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validBody(schemas.updateFavoriteSchema),
  ctrlWrapp(ctrl.updateFavorite)
);

module.exports = router;
