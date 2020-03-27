import * as mysql from 'promise-mysql';
import * as xmlJs from 'xml-js';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let retries = 0;

function promiseTimeout (time) {
    return new Promise(function(resolve,reject){
      setTimeout(function(){resolve(time);},time);
    });
  };

const seedDatabase = async () => {
    let connection: mysql.Connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        const dropTable = "DROP TABLE IF EXISTS timezones";
        await connection.query(dropTable);
        console.log("table toredown");

        const createTable = "CREATE TABLE IF NOT EXISTS timezones (id INT PRIMARY KEY, name VARCHAR(255), hours INT, mins INT, secs INT)";

        await connection.query(createTable);
        console.log("table created");

        const xml = await fs.readFile(process.cwd() + '/bin/timezones.xml', 'utf8');
        const timezones: any = (xmlJs.xml2js(xml, {compact: true}) as any).TimeZones.TimeZone;

        let insert = "INSERT INTO timezones VALUES\n";
        timezones.forEach((element: any, i: number) => {
            insert = insert.concat(`(${element.Id._text}, "${element.Name._text}", ${element.Hours._text}, ${element.Mins._text}, ${element.Secs._text})` + ((i === timezones.length-1) ? `;\n` : `,\n`));
        });

        await connection.query(insert);
        console.log("data inserted from xml");
    } catch (error) {
        console.error(error);
        if (retries < 5) {
            // wait 30 seconds then retry
            console.log('retrying: ' + retries);
            retries++;
            await promiseTimeout(30000);
            return await seedDatabase();
        }

        await connection.end();
        process.exit(1);
    }

    await connection.end();
    process.exit();
}

seedDatabase();