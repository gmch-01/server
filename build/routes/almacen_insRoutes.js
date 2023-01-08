"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const almacenInsumosController_1 = require("../controllers/almacenInsumosController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', almacenInsumosController_1.almacenInsumoController.list);
        this.router.get('/:id', almacenInsumosController_1.almacenInsumoController.getOne);
        this.router.post('/', almacenInsumosController_1.almacenInsumoController.create);
        this.router.delete('/:id', almacenInsumosController_1.almacenInsumoController.delete);
        this.router.put('/:id', almacenInsumosController_1.almacenInsumoController.update);
    }
}
const almaceninsumoRoutes = new IndexRoutes();
exports.default = almaceninsumoRoutes.router;
