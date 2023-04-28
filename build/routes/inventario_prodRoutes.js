"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventarioProdController_1 = require("../controllers/inventarioProdController");
class InventarioProdRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', inventarioProdController_1.inventarioprodController.list);
        this.router.get('/esp', inventarioProdController_1.inventarioprodController.listesp);
        this.router.get('/:id', inventarioProdController_1.inventarioprodController.getOne);
        this.router.post('/', inventarioProdController_1.inventarioprodController.create);
        this.router.delete('/:id', inventarioProdController_1.inventarioprodController.delete);
        this.router.put('/:id', inventarioProdController_1.inventarioprodController.update);
    }
}
const inventarioprodRoutes = new InventarioProdRoutes();
exports.default = inventarioprodRoutes.router;
