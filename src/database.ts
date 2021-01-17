import mariadb = require("mariadb");

const pool = mariadb.createPool({ host: "127.0.0.1", user: "root", connectionLimit: 5, password: "password" });

export async function query(queryString: string) {
    let conn: mariadb.PoolConnection;
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
