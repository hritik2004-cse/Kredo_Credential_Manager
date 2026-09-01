const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("server url is not defined");
}

const env = {
  serverUrl: SERVER_URL,
};

export default env;
