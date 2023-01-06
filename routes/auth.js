import express from "express";

import { login, register, customerRegister } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/customer/register", customerRegister);
router.post("/login", login);

export default router;