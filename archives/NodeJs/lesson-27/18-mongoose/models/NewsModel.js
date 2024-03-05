const mongoose = require('./db');

const NewsSchema = mongoose.Schema({
  title: String,
  des: {
    type: String,
    default: "this is default info!"
  },
  link: {
    type: String,
    set(data) {
      return `${data}-arrow`
    }
  }
});

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;