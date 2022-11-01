const express = require('express');

const ctrl = require('../../controllers');

const { ctrlWrapp } = require('../../helpers');

const { validBody, isValidId, authenficate } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenficate, ctrlWrapp(ctrl.listContacts));

router.get('/:id', authenficate, isValidId, ctrlWrapp(ctrl.getById));

router.post(
  '/',
  authenficate,
  validBody(schemas.addSchema),
  ctrlWrapp(ctrl.addContact)
);

router.delete('/:id', authenficate, isValidId, ctrlWrapp(ctrl.removeById));

router.put(
  '/:id',
  authenficate,
  isValidId,
  validBody(schemas.addSchema),
  ctrlWrapp(ctrl.updateById)
);

router.patch(
  '/:id/favorite',
  authenficate,
  isValidId,
  validBody(schemas.updateFavoriteSchema),
  ctrlWrapp(ctrl.updateFavorite)
);

module.exports = router;
