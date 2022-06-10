const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const checkToken = req.get('X-Access-Token');
  if (!checkToken) {
    throw new ClientError(401, 'authentication required');
  } else {
    const payload = jwt.verify(checkToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  }
}

module.exports = authorizationMiddleware;
