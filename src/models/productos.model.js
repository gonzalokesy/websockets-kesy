import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nombreColeccionProductos = 'productos';

// Agrego la propiedad dafault, que la da un estado por default a la variable. Tanto en su inicio, como si carece de contenido. 
const productoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: Array, default: [] }
});

productoSchema.plugin(mongoosePaginate)
const modeloProducto = mongoose.model(nombreColeccionProductos, productoSchema);

export default modeloProducto;