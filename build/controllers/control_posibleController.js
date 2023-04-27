"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posiblesController = void 0;
const database_1 = __importDefault(require("../database"));
class PosiblesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [posibles] = yield database_1.default.promise().query('SELECT producto.nombre AS producto, insumo.nombre AS insumo, inventario_insumo.cantidad_actual, receta.cantidad AS cantidad_necesaria, CASE WHEN ( (inventario_insumo.cantidad_actual - receta.cantidad) ) <0 THEN 0 ELSE (inventario_insumo.cantidad_actual - receta.cantidad) END AS posibles FROM receta INNER JOIN insumo INNER JOIN producto INNER JOIN inventario_insumo WHERE receta.id_producto = producto.id_producto AND receta.id_insumo = insumo.id_insumo AND receta.id_insumo = inventario_insumo.tipo_insumo ORDER BY posibles ASC;');
            res.json(posibles);
        });
    }
}
exports.posiblesController = new PosiblesController();
