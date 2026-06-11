import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const MODELO_PERSISTENCIA = process.env.MODELO_PERSISTENCIA || "";
const STRCNX = process.env.STRCNX || "mongodb://localhost:27017";
const BASE = process.env.BASE || "test";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default {
  PORT,
  MODELO_PERSISTENCIA,
  STRCNX,
  BASE,
  JWT_SECRET,
};
