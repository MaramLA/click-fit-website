import express from "express";
import { addUser, getUsers } from "../controllers/userController.js";

// endpoint: api/...
const router = express.Router();

// GET
router.get("/users", getUsers);

// POST
router.post("/users", addUser);



export default router;
