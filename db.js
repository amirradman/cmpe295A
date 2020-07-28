const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

module.exports = { client };