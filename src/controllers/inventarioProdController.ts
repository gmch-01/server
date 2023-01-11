import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class InventarioProdController {
    public async list(req: Request, res: Response) {
        const [almacenfin] = await pool.promise().query('SELECT id_inv_producto, producto.nombre AS productoInv, fecha_vencimiento, cantidad_actual FROM inventario_producto INNER JOIN producto ON inventario_producto.tipo_prod = producto.id_producto ORDER BY cantidad_actual DESC;');
        res.json(almacenfin)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const inventarioprod = await pool.promise().query('SELECT * FROM inventario_producto WHERE id_det_producto = ?', [id])
        if (inventarioprod.length > 0) {
            return res.json(inventarioprod[0]);
        }
        res.status(404).json({ text: "El producto no existe" })
        console.log(inventarioprod)
        res.json({ text: 'producto encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO inventario_producto set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'producto guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM inventario_producto WHERE id_det_producto = ?', [id])
        res.json({ message: 'Registro Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE inventario_producto set ? WHERE id_det_producto= ?', [req.body, id])
        res.json({ message: 'Registro actualizando ' })
    }
}

export const inventarioprodController = new InventarioProdController();