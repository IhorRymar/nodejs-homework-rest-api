const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');

const { RequestError, sendMail, createVerifMail } = require('../../helpers');

const signup = async (req, res) => {
  const { name, password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    name,
    password: hashPass,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifMail(email, verificationToken);

  await sendMail(mail);

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
