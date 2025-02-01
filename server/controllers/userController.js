import * as bcrypt from "bcrypt";
import { createUser, getAllUsers } from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = await createUser(email, hashedPassword);
    res
      .status(201)
      .json({ message: "User created successfully", data: newUserData });
  } catch (error) {
    next(error);
  }
};
