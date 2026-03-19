import ManagerCarritoMongo from "../managers/CartManagerMongoDB.js";
import { Router } from "express";

const router = Router();

const managerCarritoMongoDB = new ManagerCarritoMongo();


// Crear carrito
router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await managerCarritoMongoDB.crearCarrito();
        res.status(201).send({ status: "success", payload: nuevoCarrito });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
})

// Obtener todos los carritos 
router.get('/', async (req, res) => {
    try {
        const carritosExistentes = await managerCarritoMongoDB.obtenerTodosLosCarritos();
        res.status(200).send({ status: "success", payload: carritosExistentes });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
})

// Buscaar carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const buscarCarrito = await managerCarritoMongoDB.obtenerCarritoPorID(id);
        if (buscarCarrito) {
            res.send({ status: "success", payload: buscarCarrito });
        } else {
            res.status(404).send({ status: "error", message: "Carrito no encotrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
})


// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const productoAgregado = await managerCarritoMongoDB.agregarAlCarrito(idCarrito, idProducto);
        res.status(200).send({ status: "success", payload: productoAgregado });

    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
})

// Eliminar un producto del carrito 
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const productoEliminado = await managerCarritoMongoDB.eliminarProductoDelCarrito(idCarrito, idProducto)
        res.status(204).send({ status: "success", payload: productoEliminado });

    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
})

// Vaciar carrito
router.delete('/:cid', async (req, res) => {
    try {
        const idCarrito = req.params.cid;
        const carritoVaciado = await managerCarritoMongoDB.vaciarCarrito(idCarrito)
        res.status(204).send({ status: "success", payload: carritoVaciado });

    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
})

// Eliminar carrito existente
router.delete('/borrar/:cid', async (req, res) => {
    try {
        const idCarrito = req.params.cid;
        const carritoVaciado = await managerCarritoMongoDB.eliminarCarrito(idCarrito)
        res.status(204).send({ status: "success", payload: carritoVaciado });

    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
})


export default router;

