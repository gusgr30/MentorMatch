import express from "express";
import { SKILLS } from "../model/constants/index.js";

class RouterConfig {
  config() {
    const router = express.Router();

    router.get("/skills", (req, res) => res.json(SKILLS));

    return router;
  }
}

export default RouterConfig;
