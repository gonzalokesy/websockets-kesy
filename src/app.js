import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';

const app = express();

app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuracion Websockets
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Configuración del motor handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Archivos Estáticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Middlware de vistas
app.use('/', viewsRouter);
app.use('/products', productsRouter);

// Conexión Websockets
io.on('connection', (socket) => {
    console.log('🟢 Petición al servidor');
});

const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));