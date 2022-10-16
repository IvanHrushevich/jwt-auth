const userService = require("../services/user.service");

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: THIRTY_DAYS_IN_MS,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      console.log("error", error);
      return res.json({ error });
    }
  }

  async login(req, res, next) {
    try {
      //
    } catch (error) {
      //
    }
  }

  async logout(req, res, next) {
    try {
      //
    } catch (error) {
      //
    }
  }

  async activate(req, res, next) {
    try {
      //
    } catch (error) {
      //
    }
  }

  async refresh(req, res, next) {
    try {
      //
    } catch (error) {
      //
    }
  }

  async getUsers(req, res, next) {
    try {
      //
      res.json([1, 2, 3]);
    } catch (error) {
      //
    }
  }
}

module.exports = new UserController();
