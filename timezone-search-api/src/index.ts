import express from 'express';
import cors from 'cors';
import * as mysql from 'promise-mysql';
import dotenv from 'dotenv';

dotenv.config();

const app: any = express();
const port: number = parseInt(process.env.API_PORT);

app.get('/timezones', cors(), async (req: { query: { search: string }; }, res: any) => {
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