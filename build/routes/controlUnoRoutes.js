"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlUnoController_1 = require("../controllers/controlUnoController");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', controlUnoController_1.controlunoController.control);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
