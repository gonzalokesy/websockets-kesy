import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./products.json');

// Ruta para la vista estática (home)
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {
            title: 'Vista estática',
            products: products
        });
    } catch (error) {
        res.status(500).send('Error al cargar la vista home');
    }
});

// Ruta para la vista en tiempo real (Websockets)
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', {
            title: 'Vista dinámica',
            products: products
        });
    } catch (error) {
        res.status(500).send('Error al cargar la vista realTime');
    }
});

export default router;