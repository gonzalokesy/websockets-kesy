import mongoose from "mongoose";
import modeloProducto from "../models/productos.model.js";


// Tuve que usar el método lean() (no voy a mentir, recurrí a la IA luego de varios intentos) ya que no me renderizaba la página. 
// La infomarción brindada fue que se recibe un document ode Moongse en la consulta (el cual inclye métodos), y por seguridad handlebars no accede. 
// El método lean() convierte ese documento de Moongose en un objeto de JS capaz de ser utilziado por HBS. Por eso, todas consultas que sean consumidas por HBS, deben llevar ese método.
class ManagerProductoMongo {
    async agregarProducto(producto) {
        try {

            const { title, description, code, price, status, stock, category } = producto;

            if (!title || !description || !code || !price || !stock || !category) {
                throw new Error('Los campos de titulo, descripción, código, precio y categoría SON OBLIGATORIOS.')
            }

            const nuevoProducto = await modeloProducto.create(producto);
            return nuevoProducto

        } catch (error) {
            throw new Error(`Error al crear el producto: ${error}`)
        }
    }

    async obtenerProductos(filter = {}, options = {}) {
        try {
            return await modeloProducto.paginate(filter, options);
        } catch (error) {
            throw new Error(`Surgió un error durante la consutla: ${error}`)
        };
    };

    async obtenerProductoPorId(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(`El id ingresado: ${id} no corresponde a un ID de moongose.`)
            }
            const productoId = await modeloProducto.findById(id).lean();
            return productoId

        } catch (error) {
            throw new Error(`El id ingresado: ${id} no existe en la base de datos.`)
        }
    }

    async eliminarProducto(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(`El id ingresado: ${id} no corresponde a un ID de moongose.`)
            }
            const productoId = await modeloProducto.findByIdAndDelete(id);
            return productoId

        } catch (error) {
            throw new Error(`El id ingresado: ${id} no existe en la base de datos.`)
        }
    }

    async actualizarProducto(id, datos) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(`El id ingresado: ${id} no corresponde a un ID de moongose.`)
            }
            const productoId = await modeloProducto.findByIdAndUpdate(id, datos, { new: true, runValidators: true }).lean();
            return productoId

        } catch (error) {
            throw new Error(`El id ingresado: ${id} no existe en la base de datos.`)
        }
    }
}

export default ManagerProductoMongo;

