import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getOrdersByCustomerId,
} from '../Controllers/order.controller.js';
// import { userAuth, adminAuth } from '../Middlewares/auth.middleware.js'; // Assuming you have authentication middlewares
import auth from '../Middelwares/auth.middelware.js';

const orderRouter = express.Router();

// Place a new order (accessible by authenticated users)
orderRouter.post('/placeorder', auth, placeOrder);

// Get all orders (Admin functionality)
orderRouter.get('/getallorders', auth, getAllOrders);

// Get orders by customer ID (accessible by admin or the user themselves)
orderRouter.get('/customer/:userId', auth, getOrdersByCustomerId);

export default orderRouter;
