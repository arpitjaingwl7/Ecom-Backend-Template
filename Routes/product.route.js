import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/addproduct', addProduct);
productRouter.put('/updateproduct/:productId', updateProduct);
productRouter.delete('/deleteproduct/:productId', deleteProduct);
productRouter.get('/products', getAllProducts);

export default productRouter;
