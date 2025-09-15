import expres from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
const router = expres.Router();

router.get('/test', (req, res) => {
    res.send("test route is working");
});

router.get('/', getProducts);
router.post('/', createProduct);

export default router;