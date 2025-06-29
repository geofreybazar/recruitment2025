import AdminUser from "./model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../utilities/config";
import { AppError } from "../../middlewares/errorHandler";

const createAdminUserService = async (body: any, defaultPassword: string) => {
  const saltRound = 10;
  const passwordhash = await bcrypt.hash(defaultPassword, saltRound);

  const newAdminuser = await AdminUser.create({
    firstname: body.firstname,
    lastname: body.lastname,
    middlename: body.middlename,
    rank: body.rank,
    accountNumber: body.accountNumber,
    email: body.email,
    passwordhash,
    phoneNumber: body.phoneNumber,
  });

  return newAdminuser;
};

const loginService = async (body: any) => {
  const { accountNumber, password } = body;

  const user = await AdminUser.findOne({ accountNumber: accountNumber });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordhash);

  if (!user || !passwordCorrect) {
    const error: AppError = new Error("Invalid username or password");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const userForToken = {
    accountNumber: user.accountNumber,
    id: user.id,
  };

  const accessToken = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  user.refreshtokens = user.refreshtokens.concat(refreshToken);
  await user.save();

  return {
    id: user._id.toString(),
    accessToken,
    refreshToken,
  };
};

const generateRefreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    const error: AppError = new Error("Refresh token not found, Login again");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const decodedToken = jwt.verify(refreshToken, config.REFRESH_SECRET);

  if (typeof decodedToken === "string") {
    const error: AppError = new Error("Invalid token payload");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  const user = await AdminUser.findById(decodedToken.id);
  console.log(user);
  if (!user || !user.refreshtokens.includes(refreshToken)) {
    const error: AppError = new Error("Refresh token is not valid");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }

  user.refreshtokens = user.refreshtokens.filter(
    (token) => token !== refreshToken
  );

  const userToken = {
    accountNumber: user.accountNumber,
    id: user._id,
  };
  const newAccessToken = jwt.sign(userToken, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign(userToken, config.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  await AdminUser.findByIdAndUpdate(user._id, {
    $pull: { refreshtokens: refreshToken },
  });

  await AdminUser.findByIdAndUpdate(user._id, {
    $push: { refreshtokens: newRefreshToken },
  });

  return { newAccessToken, newRefreshToken };
};

export default {
  createAdminUserService,
  loginService,
  generateRefreshTokenService,
};
