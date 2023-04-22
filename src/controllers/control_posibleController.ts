import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class PosiblesController {
    public async list(req: Request, res: Response) {
        const [posibles] = await pool.promise().query('SELECT producto.nombre AS producto, insumo.nombre AS insumo, inventario_insumo.cantidad_actual, receta.cantidad AS cantidad_necesaria, CASE WHEN ( (inventario_insumo.cantidad_actual - receta.cantidad) ) <0 THEN 0 ELSE (inventario_insumo.cantidad_actual - receta.cantidad) END AS posibles FROM receta INNER JOIN insumo INNER JOIN producto INNER JOIN inventario_insumo WHERE receta.id_producto = producto.id_producto AND receta.id_insumo = insumo.id_insumo AND receta.id_insumo = inventario_insumo.tipo_insumo ORDER BY posibles ASC;');
        res.json(posibles)
    }

}

export const posiblesController = new PosiblesController();