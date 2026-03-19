import modeloCarrito from "../models/carrito.model.js";
import ManagerProductoMongo from "./ProductManagerMongoDB.js";
import mongoose from "mongoose";

const productManager = new ManagerProductoMongo()


class ManagerCarritoMongo {
    async crearCarrito() {
        try {
            const nuevoCarrito = await modeloCarrito.create({ carrito: [] });
            return nuevoCarrito
        } catch (error) {
            throw new Error(`Surgió un error al crear el nuevo carrito. Error: ${error}`)
        }
    }

    async obtenerTodosLosCarritos() {
        try {
            const carritosExsistentes = await modeloCarrito.find()
            return carritosExsistentes;
        } catch (error) {
            throw new Error(`Surgió un error al buscar los carritos existentes. Error: ${error}`)
        }
    }

    async obtenerCarritoPorID(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(`El id ingresado para el carrito: ${id} no corresponde a un ID de moongose.`)
            }
            const carritoBuscado = await modeloCarrito.findById(id).populate('carrito.producto').lean()
            if (!carritoBuscado) {
                throw new Error(`Carrito inexistente en base de datos.`)
            }
            return carritoBuscado
        } catch (error) {
            throw new Error(`Error al buscar el carrito. Error: ${error}`)
        }
    }

    async agregarAlCarrito(cid, pid) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
                throw new Error(`ID ingresado inválido`)
            }

            const busquedacarrito = await modeloCarrito.findById(cid)
            if (!busquedacarrito) {
                throw new Error(`Error al encontrar el carrito. ID: ${cid} inexistente en base de datos.`)
            }

            const existenciaProducto = await productManager.obtenerProductoPorId(pid);
            if (!existenciaProducto) {
                throw new Error(`Error al encontrar el producto. ID: ${pid} inexistente en base de datos.`)
            }

            const itemIndex = busquedacarrito.carrito.findIndex(p => p.producto.toString() === pid)
            if (itemIndex !== -1) {
                busquedacarrito.carrito[itemIndex].cantidad = busquedacarrito.carrito[itemIndex].cantidad + 1
            } else {
                busquedacarrito.carrito.push({ producto: pid, cantidad: 1 })
            }
            await busquedacarrito.save()
            // Luego de guardar llamo al método dentro de la propia clase para poder tener información dentro del payload dentro de Postman. 
            // Los productos ya saldrán con su infromación relacionada debido a que el .populate() se realzia en obtenerCarritoPorID(cid).
            const carritoConProductoNuevo = await this.obtenerCarritoPorID(cid)
            return carritoConProductoNuevo
        } catch (error) {
            throw new Error(`Error al cargar los productos. Error: ${error}`)
        }
    }

    async eliminarProductoDelCarrito(cid, pid) {
        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            throw new Error(`ID ingresado inválido`)
        }

        const seleccionCarrito = await modeloCarrito.findById(cid);
        if (!seleccionCarrito) {
            throw new Error(`El carrito ${cid} no existe.`)
        }

        const indiceProducto = seleccionCarrito.carrito.findIndex(p => p.producto.toString() === pid);
        if (indiceProducto === -1) {
            throw new Error(`El producto ${pid} no existe en el carrito.`)
        }

        seleccionCarrito.carrito.splice(indiceProducto, 1)
        await seleccionCarrito.save()
        return await this.obtenerCarritoPorID(cid);
    }

    // Vaciar carrito
    async vaciarCarrito(cid) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cid)) {
                throw new Error(`ID ingresado inválido`)
            }
            const seleccionCarrito = await modeloCarrito.findById(cid)

            if (!seleccionCarrito) {
                throw new Error(`El carrito ${cid} no existe.`)
            }
            seleccionCarrito.carrito = [];
            await seleccionCarrito.save()
        } catch (error) {
            throw new Error(`Error al vaciar el carrito. Error: ${error}`)
        }
    }

    // Eliminar carrito
    async eliminarCarrito(cid) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cid)) {
                throw new Error(`ID ingresado inválido`)
            }
            return await modeloCarrito.findByIdAndDelete(cid)
        } catch (error) {
            throw new Error(`Error al vaciar el carrito. Error: ${error}`)
        }
    }

}




export default ManagerCarritoMongo;