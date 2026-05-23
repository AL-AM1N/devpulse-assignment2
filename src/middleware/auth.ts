import type { NextFunction, Request, Response } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      // check token
      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access",
          errors: "No token provided",
        });
      }

      // verify token
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;


      req.user = decoded;

      // role check
      if (roles.length && !roles.includes(decoded.role)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden access",
          errors: "You are not authorized for this action",
        });
      }

      next();
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid token",
        errors: error.message,
      });
    }
  };
};

export default auth;
