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
const app = express_1.default();
const port = 3000;
app.get('/timezones', cors_1.default(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        connectionLimit: 100,
        host: "localhost",
        port: 3308,
        user: "root",
        password: "password",
        database: "timezones"
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