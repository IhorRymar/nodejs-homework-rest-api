const fs = require('fs');
const path = require('path');

const { User } = require('../../models/user');
        
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')
        
const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extencion = originalname.split('.').pop();
  const filename = `${_id}.${extencion}`
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL })
  res.json({
    avatarURL,
  });
}

  module.exports = avatar;