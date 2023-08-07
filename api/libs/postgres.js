require('dotenv').config();
const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
