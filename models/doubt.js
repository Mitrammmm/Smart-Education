const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
        type: String,
    },
    url: {
        type: String,
    }
  },
  author: {
    type: String,
    required: true,
  },
});

const DoubtController = mongoose.model('Doubt', doubtSchema);

module.exports = DoubtController;
