import {Request, Response} from 'express';

import db from '../database'

class GamesController {
    public index (req: Request , res:Response) {
        db.query('DESCRIBE insumos');
        res.json('insumos')
    }
}

export const gamesController = new GamesController();