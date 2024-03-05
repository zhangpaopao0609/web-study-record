const OrdersModel = require('./models/OrdersModel');

OrdersModel.aggregate([
  {
    $lookup: {
      from: "orderitems",
      localField: "order_id",
      foreignField: "order_id",
      as: "items"
    }
  }
], (err, data) => {
  if(err) {
    console.log(err);
    return;
  };
  console.log(JSON.stringify(data));
});