import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';
    
   
class ControlUnoController { 
    
    public async control(req: Request, res: Response): Promise<any> {
        const [control] = await pool.promise().query('SELECT id_receta, producto.nombre AS producto, insumo.nombre AS insumo, inventario_insumo.cantidad_actual/receta.cantidad AS posible FROM receta INNER JOIN inventario_insumo ON receta.id_insumo = inventario_insumo.tipo_insumo INNER JOIN producto ON receta.id_producto = producto.id_producto INNER JOIN insumo ON receta.id_insumo = insumo.id_insumo GROUP BY insumo ORDER BY producto');
        res.json(control)
    }

}

export const controlunoController = new ControlUnoController();