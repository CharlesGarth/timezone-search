import express from 'express';
import cors from 'cors';
import * as mysql from 'promise-mysql';

const app: any = express();
const port: number = 3000;

app.get('/timezones', cors(), async (req: { query: { search: string }; }, res: any) => {
    const config = {
        connectionLimit: 100,
        host: "localhost",
        port: 3308,
        user: "root",
        password: "password",
        database: "timezones"
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