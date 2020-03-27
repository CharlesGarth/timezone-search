"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("promise-mysql"));
const xmlJs = __importStar(require("xml-js"));
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let retries = 0;
function promiseTimeout(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(time); }, time);
    });
}
;
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        const dropTable = "DROP TABLE IF EXISTS timezones";
        yield connection.query(dropTable);
        console.log("table toredown");
        const createTable = "CREATE TABLE IF NOT EXISTS timezones (id INT PRIMARY KEY, name VARCHAR(255), hours INT, mins INT, secs INT)";
        yield connection.query(createTable);
        console.log("table created");
        const xml = yield fs_1.promises.readFile(process.cwd() + '/bin/timezones.xml', 'utf8');
        const timezones = xmlJs.xml2js(xml, { compact: true }).TimeZones.TimeZone;
        let insert = "INSERT INTO timezones VALUES\n";
        timezones.forEach((element, i) => {
            insert = insert.concat(`(${element.Id._text}, "${element.Name._text}", ${element.Hours._text}, ${element.Mins._text}, ${element.Secs._text})` + ((i === timezones.length - 1) ? `;\n` : `,\n`));
        });
        yield connection.query(insert);
        console.log("data inserted from xml");
    }
    catch (error) {
        console.error(error);
        if (retries < 5) {
            // wait 30 seconds then retry
            console.log('retrying: ' + retries);
            retries++;
            yield promiseTimeout(30000);
            return yield seedDatabase();
        }
        yield connection.end();
        process.exit(1);
    }
    yield connection.end();
    process.exit();
});
seedDatabase();
//# sourceMappingURL=seed-database.js.map