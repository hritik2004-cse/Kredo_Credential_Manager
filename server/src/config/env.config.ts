import dotenv from "dotenv";

// configuring dotenv
dotenv.config();

const PORT = Number(process.env.PORT);

if(!PORT){
  throw new Error("PORT is not defined")
}

export const env = {
  port: PORT,
};
