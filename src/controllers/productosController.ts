import { request, Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class ProductosController {
    public async list(req: Request, res: Response) {
        const [producto] = await pool.promise().query('SELECT * FROM producto');
        res.json(producto)
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const producto = await pool.promise().query('SELECT * FROM producto WHERE id_producto = ?', [id])
        if (producto.length > 0) {
            return res.json(producto[0]);
        }
        res.status(404).json({ text: "El producto no existe" })
        console.log(producto)
        res.json({ text: 'producto encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO producto set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'Producto guardado' })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM producto WHERE id_producto = ?', [id])
        res.json({ message: 'Producto Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE producto set ? WHERE id_producto= ?', [req.body, id])
        res.json({ message: 'Producto actualizando ' })
    }
}

export const productosController = new ProductosController();