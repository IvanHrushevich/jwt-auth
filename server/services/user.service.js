const bcrypt = require("bcrypt");
const uuid = require("uuid");

const userModel = require("../models/user.model");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });

    if (candidate) {
      throw new Error(`Candidate with email ${email} already exists.`);
    }

    // user creation
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);

    // tokens generation
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
