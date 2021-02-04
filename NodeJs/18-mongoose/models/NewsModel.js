const mongoose = require('./db');

const NewsSchema = mongoose.Schema({
  title: String,
  des: {
    type: String,
    default: "this is default info!"
  }
});

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;