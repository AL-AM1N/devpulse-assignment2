import type { NextFunction, Request, Response } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";


const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;