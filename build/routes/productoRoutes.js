"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productosController_1.productosController.list);
        this.router.get('/:id', productosController_1.productosController.getOne);
        this.router.post('/', productosController_1.productosController.create);
        this.router.delete('/:id', productosController_1.productosController.delete);
        this.router.put('/:id', productosController_1.productosController.update);
    }
}
const productosRoutes = new GamesRoutes();
exports.default = productosRoutes.router;
