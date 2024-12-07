import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingDetails: { type: Object, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
