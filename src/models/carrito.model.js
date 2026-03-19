import mongoose from "mongoose";

const nombreColeccionCarrito = 'carrito';

const carritoSchema = new mongoose.Schema({
    carrito: [{
        producto: { type: mongoose.Schema.ObjectId, ref: 'productos' },
        cantidad: { type: Number, default: 1 }
    }]
});

const modeloCarrito = mongoose.model(nombreColeccionCarrito, carritoSchema);

export default modeloCarrito;