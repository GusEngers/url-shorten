const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Url = require('../models/url');
require('dotenv').config();

function getUser(token) {
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    return user._id;
  } catch (_) {
    throw new Error('Un error ocurrió al procesar la información del usuario');
  }
}

async function createUrl({ token, type, path, data }) {
  const id = getUser(token);
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
