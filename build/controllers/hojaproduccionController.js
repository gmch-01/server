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
exports.hojaprodController = void 0;
const database_1 = __importDefault(require("../database"));
class HojaProdController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hojaprod] = yield database_1.default.promise().query('SELECT hoja_de_produccion.id_hoja_produccion , producto.nombre AS receta, hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja, hoja_de_produccion.encargado, hoja_de_produccion.progreso, hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto ORDER BY hoja_de_produccion.id_hoja_produccion DESC ');
            res.json(hojaprod);
        });
    }
    listesp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hojaprod] = yield database_1.default.promise().query('SELECT hoja_de_produccion.id_hoja_produccion,producto.nombre AS receta,hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja,hoja_de_produccion.encargado,hoja_de_produccion.progreso,hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado,(SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE() AND progreso >= 20;');
            res.json(hojaprod);
        });
    }
    hoydesp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hojaprod] = yield database_1.default.promise().query('SELECT hoja_de_produccion.id_hoja_produccion,producto.nombre AS receta,hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja,hoja_de_produccion.encargado,hoja_de_produccion.progreso,hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado,(SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()');
            res.json(hojaprod);
        });
    }
    hoyrec(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hojaprod] = yield database_1.default.promise().query('SELECT hoja_de_produccion.id_hoja_produccion,producto.nombre AS receta,hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja,hoja_de_produccion.encargado,hoja_de_produccion.progreso,hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado, cantidad_bolsa,peso_receta,(SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE() AND progreso >=20');
            res.json(hojaprod);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const hojaprod = yield database_1.default.promise().query('SELECT * FROM hoja_de_produccion WHERE id_hoja_produccion = ?', [id]);
            if (hojaprod.length > 0) {
                return res.json(hojaprod[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(hojaprod);
            res.json({ text: 'producto encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO hoja_de_produccion set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'producto guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM hoja_de_produccion WHERE id_hoja_produccion = ?', [id]);
            res.json({ message: 'Registro Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE hoja_de_produccion set ? WHERE id_hoja_produccion= ?', [req.body, id]);
            res.json({ message: 'Registro actualizando ' });
        });
    }
}
exports.hojaprodController = new HojaProdController();
