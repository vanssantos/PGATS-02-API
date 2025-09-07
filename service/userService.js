const { users } = require('../model/userModel');

function registerUser({ username, password, isFavorecido }) {
  if (!username || !password) return { error: 'Username and password required.' };
  if (users.find(u => u.username === username)) return { error: 'User already exists.' };
  const user = { username, password, isFavorecido: !!isFavorecido, balance: 10000 };
  users.push(user);
  return { user };
}

function loginUser({ username, password }) {
  if (!username || !password) return { error: 'Username and password required.' };
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Invalid credentials.' };
  return { user };
}

function getUsers() {
  return users;
}

module.exports = { registerUser, loginUser, getUsers };
