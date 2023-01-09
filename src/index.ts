import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import almacen_prod_finRoutes from './routes/almacen_prod_finRoutes';
import almacenInsumosRoutes from './routes/almacen_insRoutes';
import productosRoutes from './routes/productoRoutes'
import recetasRoutes from './routes/recetasRoutes';
class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))


    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/games', gamesRoutes); //INSUMOS
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/almacenfin', almacen_prod_finRoutes);
        this.app.use('/api/almacenins', almacenInsumosRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/recetas', recetasRoutes)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('post'));
        })

    }



}

const server = new Server();
server.start();

