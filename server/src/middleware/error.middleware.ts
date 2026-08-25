import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error.utils.js";
import { isMongoDuplicateKeyError } from "../utils/error.utils.js";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  // mongoDB duplicate error
  if (isMongoDuplicateKeyError(error)) {
    return res
      .status(409)
      .json({ success: false, message: "Resource already exist" });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

export default errorHandler;
