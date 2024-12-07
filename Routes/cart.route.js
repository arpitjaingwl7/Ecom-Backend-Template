import express from 'express';
import { 
  addToCart, 
  getCart, 
  deleteProductFromCart, 
  updateCart 
} from '../Controllers/cart.controller.js';
import auth from '../Middelwares/auth.middelware.js';

const cartRouter = express.Router();

// Add a product to the cart
cartRouter.post('/add',auth, addToCart);

// Get all products in the user's cart
cartRouter.get('/', auth , getCart);

// Delete a product from the cart
cartRouter.delete('/remove/:productId',auth, deleteProductFromCart);

// Update the quantity of a product in the cart
cartRouter.put('/update', auth, updateCart);

export default cartRouter;
