const Mongoose = require('./db');

const OrderItemsSchema = new Mongoose.Schema({
  order_id: {
    type: String,
    require: true,
    validate: v => {
      return v.length === 3;
    }
  },
  item_id: {
    type: String,
    require: true,
    validate: v => {
      return v.length === 5;
    }
  }
});

const OrderItemsModel = Mongoose.model("OrderItems", OrderItemsSchema);

module.exports = OrderItemsModel;