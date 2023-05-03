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
exports.almacenInsumoController = void 0;
const database_1 = __importDefault(require("../database"));
class AlmacenInsumoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almaceninsumo] = yield database_1.default.promise().query('SELECT kardex_insumo.id_det_insumo, fecha_entrada, proveedor, cantidad, insumo.nombre AS nombre, peso, usuario, fecha_vencimiento FROM kardex_insumo INNER JOIN insumo WHERE kardex_insumo.id_insumo = insumo.id_insumo;');
            res.json(almaceninsumo);
        });
    }
    listesp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almaceninsumo] = yield database_1.default.promise().query('SELECT kardex_insumo.id_det_insumo, fecha_entrada, proveedor, cantidad, insumo.nombre AS nombre, peso, usuario, fecha_vencimiento, DATEDIFF(STR_TO_DATE(fecha_vencimiento, "%Y-%m-%d"), CURDATE()) AS dias_restantes FROM kardex_insumo INNER JOIN insumo WHERE kardex_insumo.id_insumo = insumo.id_insumo ORDER BY dias_restantes;');
            res.json(almaceninsumo);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const almaceninsumo = yield database_1.default.promise().query('SELECT * FROM kardex_insumo WHERE id_det_insumo = ?', [id]);
            if (almaceninsumo.length > 0) {
                return res.json(almaceninsumo[0]);
            }
            res.status(404).json({ text: "El registro de insumo no existe" });
            console.log(almaceninsumo);
            res.json({ text: 'registro de insumo encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO kardex_insumo set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'registro de insumo guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM kardex_insumo WHERE id_det_insumo = ?', [id]);
            res.json({ message: 'Registro Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE kardex_insumo set ? WHERE id_det_insumo= ?', [req.body, id]);
            res.json({ message: 'Registro actualizando ' });
        });
    }
}
exports.almacenInsumoController = new AlmacenInsumoController();
