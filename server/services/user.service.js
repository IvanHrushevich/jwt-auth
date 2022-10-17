const bcrypt = require("bcrypt");
const uuid = require("uuid");

const userModel = require("../models/user.model");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Candidate with email ${email} already exists.`
      );
    }

    // user creation
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    const activationUrl = `${process.env.API_URL}/api/activate/${activationLink}`;
    await mailService.sendActivationMail(email, activationUrl);

    // tokens generation
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw new ApiError.BadRequest("No User with provided activation link.");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError.BadRequest("No User with provided email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw ApiError.BadRequest("Wrong password");
    }

    // tokens generation
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new UserService();
