"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const mariadb = require("mariadb");
const pool = mariadb.createPool({ host: "127.0.0.1", user: "root", connectionLimit: 5, password: "password" });
async function query(queryString) {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = conn.query(queryString);
        return response;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) {
            conn.release();
        }
    }
}
exports.query = query;
//# sourceMappingURL=database.js.map