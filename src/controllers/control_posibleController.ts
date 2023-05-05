import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class PosiblesController {
        public async list(req: Request, res: Response) {


                const [posibles] = await pool.promise().query('SELECT producto.nombre AS producto, MIN(FLOOR(inventario.existencia / receta.cantidad)) AS recetas_posibles, (SELECT insumo.nombre FROM receta INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo INNER JOIN ( SELECT tipo_insumo, SUM(cantidad_actual) AS existencia FROM inventario_insumo GROUP BY tipo_insumo) AS inventario ON insumo.id_insumo = inventario.tipo_insumo WHERE receta.id_producto = producto.id_producto GROUP BY receta.id_receta HAVING FLOOR(inventario.existencia / receta.cantidad) = MIN(FLOOR(inventario.existencia / receta.cantidad)) LIMIT 1 ) AS insumo_limitante FROM receta INNER JOIN producto ON receta.id_producto = producto.id_producto INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo INNER JOIN (  SELECT tipo_insumo, SUM(cantidad_actual) AS existencia  FROM inventario_insumo GROUP BY tipo_insumo ) AS inventario ON insumo.id_insumo = inventario.tipo_insumo GROUP BY producto.nombre ORDER BY producto.nombre');
                res.json(posibles)
        }

}

export const posiblesController = new PosiblesController();