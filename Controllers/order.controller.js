import Order from '../Models/order.model.js';
import Cart from '../Models/cart.model.js';
import Product from '../Models/product.model.js';

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user
    const { shippingDetails } = req.body;

    if (!shippingDetails) {
      return res.status(400).json({ message: 'Shipping details are required' });
    }

    // Retrieve user's cart
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total amount
    const totalAmount = cart.products.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity; // Assumes Product schema has `price`
    }, 0);

    // Create a new order
    const order = new Order({
      userId,
      products: cart.products.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingDetails,
    });

    // Save order and clear the cart
    await order.save();
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin functionality)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by customer ID
export const getOrdersByCustomerId = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract customer ID from params

    const orders = await Order.find({ userId }).populate('products.productId');
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this customer' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
