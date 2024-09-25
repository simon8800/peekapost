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
  const text = "SELECT id, username, admin FROM users WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(text, values);
}

module.exports = {
  getAllMessages,
  getAllUsers,
  getAllMessagesWithUsernames,
  getUserById,
};
