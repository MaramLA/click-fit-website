import dbPool from "../config/database.js";

export const getAllUsers = async () => {
  const [users] = await dbPool.query("SELECT * FROM users");
  return users;
};

export const getUserById = async (id) => {
  const [user] = await dbPool.query("SELECT * FROM users WHERE id = ?", [id]);
  return user;
};

export const createUser = async (email, hashedPassword, type, active) => {
  const [result] = await dbPool.query(
    "INSERT INTO users (email, password, type, active) VALUES (?, ?, ?, ?)",
    [email, hashedPassword, "user", 1]
  );

  const newUserData = await getUserById(result.insertId);

  return newUserData;
};
