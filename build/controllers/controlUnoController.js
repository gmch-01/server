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
exports.controlunoController = void 0;
const database_1 = __importDefault(require("../database"));
class ControlUnoController {
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [control] = yield database_1.default.promise().query('SELECT id_receta, producto.nombre AS producto, insumo.nombre AS insumo, inventario_insumo.cantidad_actual/receta.cantidad AS posible FROM receta INNER JOIN inventario_insumo ON receta.id_insumo = inventario_insumo.tipo_insumo INNER JOIN producto ON receta.id_producto = producto.id_producto INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo GROUP BY insumo ORDER BY producto');
            res.json(control);
        });
    }
}
exports.controlunoController = new ControlUnoController();
