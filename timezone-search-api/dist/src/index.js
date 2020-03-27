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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql = __importStar(require("promise-mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const port = parseInt(process.env.API_PORT);
app.get('/timezones', cors_1.default(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    try {
        const pool = yield mysql.createPool(config);
        const search = `SELECT * FROM timezones WHERE name LIKE '%${req.query.search}%';`;
        const result = yield pool.query(search);
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        res.statusCode = 500;
        return res.send(error);
    }
}));
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=index.js.map