const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function transfer({ from, to, amount }) {
  if (!from || !to || typeof amount !== 'number') return { error: 'Missing parameters.' };
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) return { error: 'Sender or recipient not found.' };
  if (sender.balance < amount) return { error: 'Insufficient funds.' };
  if (!recipient.isFavorecido && amount >= 5000) return { error: 'Transfers >= R$ 5.000,00 only allowed to favorecido.' };
  sender.balance -= amount;
  recipient.balance += amount;
  const transferRecord = { from, to, amount, date: new Date() };
  transfers.push(transferRecord);
  return { transfer: transferRecord };
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
