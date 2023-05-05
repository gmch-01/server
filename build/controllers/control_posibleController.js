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
            const [posibles] = yield database_1.default.promise().query('SELECT producto.nombre AS producto, MIN(FLOOR(inventario.existencia / receta.cantidad)) AS recetas_posibles, (SELECT insumo.nombre FROM receta INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo INNER JOIN ( SELECT tipo_insumo, SUM(cantidad_actual) AS existencia FROM inventario_insumo GROUP BY tipo_insumo) AS inventario ON insumo.id_insumo = inventario.tipo_insumo WHERE receta.id_producto = producto.id_producto GROUP BY receta.id_receta HAVING FLOOR(inventario.existencia / receta.cantidad) = MIN(FLOOR(inventario.existencia / receta.cantidad)) LIMIT 1 ) AS insumo_limitante FROM receta INNER JOIN producto ON receta.id_producto = producto.id_producto INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo INNER JOIN (  SELECT tipo_insumo, SUM(cantidad_actual) AS existencia  FROM inventario_insumo GROUP BY tipo_insumo ) AS inventario ON insumo.id_insumo = inventario.tipo_insumo GROUP BY producto.nombre ORDER BY producto.nombre');
            res.json(posibles);
        });
    }
}
exports.posiblesController = new PosiblesController();
