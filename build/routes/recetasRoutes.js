"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recetasControllers_1 = require("../controllers/recetasControllers");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', recetasControllers_1.recetasController.list);
        this.router.get('/esp', recetasControllers_1.recetasController.listEsp);
        this.router.get('/:id', recetasControllers_1.recetasController.getOne);
        this.router.post('/', recetasControllers_1.recetasController.create);
        this.router.delete('/:id', recetasControllers_1.recetasController.delete);
        this.router.put('/:id', recetasControllers_1.recetasController.update);
    }
}
const productosRoutes = new GamesRoutes();
exports.default = productosRoutes.router;
