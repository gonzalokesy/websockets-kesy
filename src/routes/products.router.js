import { Router } from 'express';
import ManagerProductoMongo from '../managers/ProductManagerMongoDB.js';

const router = Router();

const managerMongoDB = new ManagerProductoMongo()


// Crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const producto = req.body;
        const newProduct = await managerMongoDB.agregarProducto(producto);
        const updatedProducts = await managerMongoDB.obtenerProductos();

        req.io.emit('updateProducts', updatedProducts);
        res.status(201).send({ status: "success", payload: newProduct });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
})


// Eliminar un producto por ID 
router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const result = await managerMongoDB.eliminarProducto(id);

        if (result) {
            const updatedProducts = await managerMongoDB.obtenerProductos();
            req.io.emit('updateProducts', updatedProducts);

            res.status(204).send({ status: "success", message: "Producto eliminado" });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await managerMongoDB.obtenerProductoPorId(id);

        if (product) {
            res.send({ status: "success", payload: product });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const { limit = 5, page = 1, sort, query } = req.query;

        const filtro = query ? { category: query } : {};

        const opciones = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true
        };

        if (sort) {
            opciones.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const consulta = await managerMongoDB.obtenerProductos(filtro, opciones)
        res.status(200).send({
            status: 'success',
            payload: consulta.docs,
            totalPages: consulta.totalPages,
            prevPage: consulta.prevPage,
            nextPage: consulta.nextPage,
            page: consulta.page,
            hasPrevPage: consulta.hasPrevPage,
            hasNextPage: consulta.hasNextPage,
            prevLink: consulta.hasPrevPage ? `/products?page=${consulta.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}` : null,
            nextLink: consulta.hasNextPage ? `/products?page=${consulta.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}` : null,
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

// Actualziar productos
router.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const updateData = req.body;

        const result = await managerMongoDB.actualizarProducto(id, updateData);

        if (result) {
            const updatedList = await managerMongoDB.obtenerProductos();
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