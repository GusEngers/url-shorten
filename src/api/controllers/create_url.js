const User = require('../models/user');
const Url = require('../models/url');
const getUserWithToken = require('./get_user_with_token');

async function createUrl({ token, type, path, data }) {
  const id = getUserWithToken(token);
  try {
    const user = await User.findById(id);
    const index = new Date().getTime().toString(36);
    if (type === 'private') {
      const private = new Url({
        index,
        access_code: data.access_code,
        private: true,
        original_url: data.original_url,
        shorten_url: path + index,
      });
      await private.save();
      user.privates.push(private._id);
      await user.save();
    }
    if (type === 'public') {
      const public = new Url({
        index,
        original_url: data.original_url,
        shorten_url: path + index,
      });
      await public.save();
      user.publics.push(public._id);
      await user.save();
    }
  } catch (_) {
    console.log(_)
    throw new Error('Error al crear la nueva url');
  }
}

module.exports = createUrl;
