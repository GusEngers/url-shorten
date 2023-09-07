const Url = require('../models/url');
const User = require('../models/user');
const getUserWithToken = require('./get_user_with_token');

async function deleteUrl({ token, id_url, type }) {
  const idUser = getUserWithToken(token);
  try {
    const user = await User.findById(idUser);
    if (type === 'public') {
      user.publics = user.publics.filter((id) => id !== id_url);
      user.save();
    }
    if (type === 'private') {
      user.privates = user.privates.filter((id) => id !== id_url);
      user.save();
    }
    await Url.findByIdAndDelete(id_url);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = deleteUrl;
