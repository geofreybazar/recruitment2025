import { Request, Response, NextFunction } from "express";
import service from "./service";

const addAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const defaultPassword = "admin123";

  try {
    const newAdminuser = await service.createAdminUserService(
      body,
      defaultPassword
    );
    res.status(200).json(newAdminuser);
    return;
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    const { id, accessToken, refreshToken } = await service.loginService(body);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      id: id,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {};

const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("refreshing");
  const refreshToken = req.cookies.refresh_token;

  try {
    const { newAccessToken, newRefreshToken } =
      await service.generateRefreshTokenService(refreshToken);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed" });
    return;
  } catch (error: any) {
    next(error);
  }
};

export default {
  addAdminUser,
  login,
  logout,
  generateRefreshToken,
};
