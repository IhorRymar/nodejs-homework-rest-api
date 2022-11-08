const { BASE_URL } = process.env;

const createVerifMail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>Verify your e-mail</a>`,
  };
  return mail;
};

module.exports = createVerifMail;
