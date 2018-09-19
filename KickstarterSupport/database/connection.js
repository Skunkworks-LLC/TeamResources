const mongoose = require('mongoose');

mongoose.connect('mongodb://database/kickstarter').then(() => {
  console.log('Connected to the database at port -> 27017');
});

const db = mongoose.connection;
db.on('error', err => console.error(err));

module.exports = db;
