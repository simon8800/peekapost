const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  return rows;
}

async function getAllUsers() {
  const { rows } = await pool.query(`SELECT id, username, admin FROM users`);
  return rows;
}

async function getAllMessagesWithUsernames() {
  const { rows } = await pool.query(
    `SELECT messages.id, content, sender_id, created_at, users.username FROM messages
      JOIN users ON
      messages.sender_id = users.id`
  );
  return rows;
}

async function getUserById(id) {
  const text = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

async function getUserByUsername(username) {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

async function createUser({ username, hash, admin }) {
  // Check if username is available
  const checkUserQuery = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await pool.query(checkUserQuery, [username]);
  if (rows[0]) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  try {
    const text = `INSERT INTO users(username, hash, admin)
    VALUES ($1, $2, $3)`;
    const values = [username, hash, admin];
    await pool.query(text, values);
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while creating the user. Please try again.",
    };
  }
}

module.exports = {
  getAllMessages,
  getAllUsers,
  getAllMessagesWithUsernames,
  getUserById,
  getUserByUsername,
  createUser,
};
