import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as mysql from 'promise-mysql';
import dotenv from 'dotenv';
import joi, { ObjectSchema } from '@hapi/joi';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.API_PORT);

const searchSchema: ObjectSchema = joi.object({search: joi.string().alphanum().min(0).max(255).allow('').optional()});

const validate = (schema: ObjectSchema, property: string) => {
    return async (req: Request, res: Response, next: () => void) => { 
        try {
            await schema.validateAsync(req[property]);
            next();
        } catch (error) {
            console.log("Invalid Input: ", error);
            res.status(422).json({ error: error });
        }
      } 
}

app.get('/timezones', cors(), validate(searchSchema, 'query'), async (req: { query: { search: string }; }, res: any) => {
    const config = {
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };

    try {
        const pool = await mysql.createPool(config);
        const search = `SELECT * FROM timezones WHERE name LIKE '%${req.query.search}%';`;
        const result = await pool.query(search);
        return res.json(result);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        return res.send(error);
    }
});

app.listen(port, () => console.log(`listening on port ${port}`));