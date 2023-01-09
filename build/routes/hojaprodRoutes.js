"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hojaproduccionController_1 = require("../controllers/hojaproduccionController");
class HojaProdRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', hojaproduccionController_1.hojaprodController.list);
        this.router.get('/:id', hojaproduccionController_1.hojaprodController.getOne);
        this.router.post('/', hojaproduccionController_1.hojaprodController.create);
        this.router.delete('/:id', hojaproduccionController_1.hojaprodController.delete);
        this.router.put('/:id', hojaproduccionController_1.hojaprodController.update);
    }
}
const hojaprodRoutes = new HojaProdRoutes();
exports.default = hojaprodRoutes.router;
