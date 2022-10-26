const { Contact } = require('../models/contact');

const { RequestError } = require('../helpers');

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw RequestError(400, 'Missing field favorite');
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = updateFavorite;
