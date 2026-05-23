import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    //check token exists
    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access",
      });
    }

    //verify token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid token",
    });
  }
};


export default auth;