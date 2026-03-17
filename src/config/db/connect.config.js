import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/backend_76800');
        console.log('✅ MongoDB conectado con éxito en mongodb://127.0.0.1:27017/backend_76800');
    } catch (error) {
        console.error('Error al conectar con MongoDB', error);
        process.exit(1);
    };
};

export default connectMongoDB;