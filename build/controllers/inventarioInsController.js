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
exports.inventarioinsController = void 0;
const database_1 = __importDefault(require("../database"));
class InventarioInsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT id_inv_ins, insumo.nombre AS insumoInv, fecha_venc, cantidad_actual,  insumo.unidad AS unidad FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON tipo_insumo = insumo.id_insumo ORDER BY cantidad_actual ASC;');
            res.json(almacenfin);
        });
    }
    listesp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT  insumo.nombre, SUM(cantidad_actual) AS existencia, fecha_venc, insumo.unidad, insumo.max, ROUND(((SUM(cantidad_actual)/insumo.max)*100),1) AS porcentaje, (insumo.max - SUM(cantidad_actual)) AS faltante FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON tipo_insumo = insumo.id_insumo GROUP BY tipo_insumo;');
            res.json(almacenfin);
        });
    }
    datachart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT SUM(cantidad_actual) AS existencia, (SUM(insumo.max)-SUM(cantidad_actual)) AS falta FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON tipo_insumo = insumo.id_insumo ;');
            res.json(almacenfin);
        });
    }
    lotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT id_inv_ins, insumo.nombre, lote, SUM(cantidad_actual) AS existencia, IF(DATEDIFF(STR_TO_DATE(fecha_venc, "%Y-%m-%d"), CURDATE()) < 0, 0, DATEDIFF(STR_TO_DATE(fecha_venc, "%Y-%m-%d"), CURDATE())) AS dias_restantes FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON inventario_insumo.tipo_insumo = insumo.id_insumo WHERE STR_TO_DATE(fecha_venc, "%Y-%m-%d") BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 2 MONTH) GROUP BY insumo.nombre, lote HAVING existencia > 0 AND dias_restantes > 0 ORDER BY dias_restantes;');
            res.json(almacenfin);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const inventarioprod = yield database_1.default.promise().query('SELECT * FROM inventario_producto WHERE id_inv_insumo = ?', [id]);
            if (inventarioprod.length > 0) {
                return res.json(inventarioprod[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(inventarioprod);
            res.json({ text: 'producto encontrado ' });
        });
    }
    getCharts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insumo } = req.params;
            const inventarioprod = yield database_1.default.promise().query('SELECT id_inv_ins, insumo.nombre, lote, SUM(cantidad_actual) AS existencia FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON inventario_insumo.tipo_insumo = insumo.id_insumo WHERE insumo.nombre= ? GROUP BY insumo.nombre, lote ', [insumo]);
            if (inventarioprod.length > 0) {
                return res.json(inventarioprod[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(inventarioprod);
            res.json({ text: 'producto encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO inventario_insumo set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'producto guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM inventario_insumo WHERE id_inv_insumo = ?', [id]);
            res.json({ message: 'Registro Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE inventario_insumo set ? WHERE id_inv_ins= ?', [req.body, id]);
            res.json({ message: 'Registro actualizando ' });
        });
    }
}
exports.inventarioinsController = new InventarioInsController();
