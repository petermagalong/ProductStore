import expres from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, } from '../controllers/productController.js';
const router = expres.Router();

router.get('/test', (req, res) => {
    res.send("test route is working");
});

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;