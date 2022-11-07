const { User } = require('../../models/user');

const { RequestError, sendMail, createVerifMail } = require('../../helpers');

const resendVerif = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404);
  }

  if (user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }

  const mail = createVerifMail(email, user.verificationToken);

  await sendMail(mail);
  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerif;
