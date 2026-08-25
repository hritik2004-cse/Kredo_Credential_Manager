export const isMongoDuplicateKeyError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("code" in error)) {
    return false;
  }

  return error.code === 11000;
};
