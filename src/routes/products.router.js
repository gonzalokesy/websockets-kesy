import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./products.json');

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        const updatedProducts = await productManager.getProducts();

        req.io.emit('updateProducts', updatedProducts);
        res.status(201).send({ status: "success", payload: newProduct });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(id);

        if (result) {
            const updatedProducts = await productManager.getProducts();
            req.io.emit('updateProducts', updatedProducts);

            res.send({ status: "success", message: "Producto eliminado" });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);

        if (product) {
            res.send({ status: "success", payload: product });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = req.body;

        const result = await productManager.updateProduct(id, updateData)

        if (result) {
            const updatedList = await productManager.getProducts();
            req.io.emit('updateProducts', updatedList)

            res.send({ status: "success", message: "Producto actualizado", payload: result });
        } else {
            res.status(404).send({ status: "error", message: "No se pudo actualizar" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

export default router;