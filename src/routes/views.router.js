import { Router } from 'express';
import ProductManager from '../managers/ProductManagerMongoDB.js';
import ManagerCarritoMongo from '../managers/CartManagerMongoDB.js';


const router = Router();
const productManager = new ProductManager();
const carritoManager = new ManagerCarritoMongo();

// Ruta para la vista estática (home)
router.get('/', async (req, res) => {
    try {
        const products = await productManager.obtenerProductos({}, { limit: 50, lean: true });
        res.render('home', {
            title: 'Vista estática',
            products: products.docs
        });
    } catch (error) {
        res.status(500).send('Error al cargar la vista home');
    }
});

// Ruta para la vista en tiempo real (Websockets)
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.obtenerProductos({}, { limit: 50, lean: true });
        res.render('realTimeProducts', {
            title: 'Vista dinámica',
            products: products.docs
        });
    } catch (error) {
        res.status(500).send('Error al cargar la vista realTime');
    }
});

// Ruta para la muestra de paginación 
router.get('/productsPaginated', async (req, res) => {
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

        const consulta = await productManager.obtenerProductos(filtro, opciones)

        res.render('products', {
            productos: consulta.docs,
            totalPages: consulta.totalPages,
            prevPage: consulta.prevPage,
            nextPage: consulta.nextPage,
            page: consulta.page,
            hasPrevPage: consulta.hasPrevPage,
            hasNextPage: consulta.hasNextPage,
            limit,
            sort,
            query
        })

    } catch (error) {
        res.status(500).send('Error al cargar la vista products');
    }
})

// Ruta para el carrito
// Atención!!!! Colocar en la URL el ID del carrito creado previamente
router.get('/cart/:cid', async (req, res) => {
    try {
        const idCarrito = req.params.cid;
        const datosCarrito = await carritoManager.obtenerCarritoPorID(idCarrito)
        if (datosCarrito) {
            res.render('carrito', {
                productos: datosCarrito.carrito,
                idCarrito: idCarrito
            })
        }
    } catch (error) {
        res.status(500).send('Error al cargar la vista products');
    }
})

export default router;