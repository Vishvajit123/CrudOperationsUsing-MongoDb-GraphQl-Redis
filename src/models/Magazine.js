const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Magazine = mongoose.model('Magazine', magazineSchema);

module.exports = Magazine;
