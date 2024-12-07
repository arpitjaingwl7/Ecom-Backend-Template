import Cart from '../Models/cart.model.js';
import Product from '../Models/product.model.js';

// Add a product to the cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productInCart = cart.products.find(p => p.productId.toString() === productId);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items in the user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product from the cart
export const deleteProductFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the quantity of a product in the cart
// Update the quantity of a product in the cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const productInCart = cart.products.find(p => p.productId.toString() === productId);
    if (!productInCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // If quantity is 0, remove the product from the cart
    if (quantity <= 0) {
      cart.products = cart.products.filter(p => p.productId.toString() !== productId);
      await cart.save();
      return res.status(200).json({ message: 'Product removed from cart', cart });
    }

    // Update the product quantity
    productInCart.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
