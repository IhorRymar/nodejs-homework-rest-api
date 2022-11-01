const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { RequestError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenficate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (e) {
    if (!e.status) {
      e.status = 401;
    }
    next(e);
  }
};

module.exports = authenficate;
