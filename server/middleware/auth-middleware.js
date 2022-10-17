const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      next(ApiError.UnAuthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      next(ApiError.UnAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      next(ApiError.UnAuthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    next(ApiError.UnAuthorizedError());
  }
};
