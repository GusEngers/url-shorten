const Url = require('../models/url');
const User = require('../models/user');
const getUserWithToken = require('./get_user_with_token');

async function deleteUrl({ token, id_url }) {
  const idUser = getUserWithToken(token);
  try {
    const user = await User.findById(idUser);
    user.privates = user.privates.filter((id) => id !== id_url);
    user.save();
    await Url.findByIdAndDelete(id_url);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = deleteUrl;
