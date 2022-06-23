const jwt = require('jsonwebtoken');
const expiresIn = parseInt(process.env.JWT_AGE_SECONDS) * 1000;
module.exports = async (payload)=>jwt.sign(
  payload,
  process.env.JWT_SECRET,
  {expiresIn}
);
