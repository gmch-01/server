"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const almacen_prod_finRoutes_1 = __importDefault(require("./routes/almacen_prod_finRoutes"));
const almacen_insRoutes_1 = __importDefault(require("./routes/almacen_insRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const recetasRoutes_1 = __importDefault(require("./routes/recetasRoutes"));
const hojaprodRoutes_1 = __importDefault(require("./routes/hojaprodRoutes"));
const inventario_prodRoutes_1 = __importDefault(require("./routes/inventario_prodRoutes"));
const inventario_insRoutes_1 = __importDefault(require("./routes/inventario_insRoutes"));
const controlUnoRoutes_1 = __importDefault(require("./routes/controlUnoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default); //INSUMOS
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/almacenfin', almacen_prod_finRoutes_1.default);
        this.app.use('/api/almacenins', almacen_insRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
        this.app.use('/api/recetas', recetasRoutes_1.default);
        this.app.use('/api/hojaprod', hojaprodRoutes_1.default);
        this.app.use('/api/inventarioprod', inventario_prodRoutes_1.default);
        this.app.use('/api/inventarioins', inventario_insRoutes_1.default);
        this.app.use('/api/control', controlUnoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('post'));
        });
    }
}
const server = new Server();
server.start();
