"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const control_posibleController_1 = require("../controllers/control_posibleController");
class PosiblesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', control_posibleController_1.posiblesController.list);
    }
}
const posiblesRoutes = new PosiblesRoutes();
exports.default = posiblesRoutes.router;
