const Mongoose = require('./db');

const OrdersSchema = new Mongoose.Schema({
  order_id: {
    type: String,
    require: true,
    unique: true,
    validate: v => {
      return v.length === 3;
    }
  },
  user: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true,
    max: 150,
    min: 12
  }
});

const OrdersModel = Mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;