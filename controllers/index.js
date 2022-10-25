const listContacts = require('./listContacts');
const getById = require('./getById');
const addContact = require('./addContact');
const removeById = require('./removeById');
const updateById = require('./updateById');
const updateFavorite = require('./updateFavorite');

module.exports = {
  listContacts,
  getById,
  addContact,
  removeById,
  updateById,
  updateFavorite,
};
