const express = require('express');

const ctrl = require('../../controllers');

const { ctrlWrapp } = require('../../helpers');

const { validBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapp(ctrl.listContacts));

router.get('/:id', isValidId, ctrlWrapp(ctrl.getById));

router.post('/', validBody(schemas.addSchema), ctrlWrapp(ctrl.addContact));

router.delete('/:id', isValidId, ctrlWrapp(ctrl.removeById));

router.put(
  '/:id',
  isValidId,
  validBody(schemas.addSchema),
  ctrlWrapp(ctrl.updateById)
);

router.patch(
  '/:id/favorite',
  isValidId,
  validBody(schemas.updateFavoriteSchema),
  ctrlWrapp(ctrl.updateFavorite)
);

module.exports = router;
