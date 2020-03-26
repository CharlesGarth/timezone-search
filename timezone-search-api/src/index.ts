import express from 'express';

const app: any = express();
const port: number = 3000;

app.get('/', async (req, res) => {
    res.send(`Hello, world\n`);
});

app.listen(port, () => console.log(`listening on port ${port}`));