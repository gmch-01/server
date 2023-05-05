"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventarioInsController_1 = require("../controllers/inventarioInsController");
class InventarioInsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', inventarioInsController_1.inventarioinsController.list);
        this.router.get('/esp', inventarioInsController_1.inventarioinsController.listesp);
        this.router.get('/chart', inventarioInsController_1.inventarioinsController.datachart);
        this.router.get('/lotes', inventarioInsController_1.inventarioinsController.lotes);
        this.router.get('/:id', inventarioInsController_1.inventarioinsController.getOne);
        this.router.get('/graf/:valor', inventarioInsController_1.inventarioinsController.getCharts);
        this.router.post('/', inventarioInsController_1.inventarioinsController.create);
        this.router.delete('/:id', inventarioInsController_1.inventarioinsController.delete);
        this.router.put('/:id', inventarioInsController_1.inventarioinsController.update);
    }
}
const inventarioinsRoutes = new InventarioInsRoutes();
exports.default = inventarioinsRoutes.router;
