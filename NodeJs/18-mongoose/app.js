const UsersModel = require('./models/UsersModel');
const NewsModel = require('./models/NewsModel');

UsersModel.find({}, (err, data) => {
  if(err) return;
  console.log(data);
});

const newsOne = new NewsModel({
  title: "arrow-new"
});
newsOne.save((err, data) => {
  if(err) return;
  NewsModel.find({}, (err, data) => {
    if(err) return;
    console.log(data);
  });
});