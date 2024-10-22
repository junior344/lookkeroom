import dotenv from 'dotenv';
dotenv.config();
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'josias',
    password: 'root',
    database: 'lokker',
    port: 3307,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (err) {
        console.log('Error connecting to the database :', err);
    }
})();


export default pool;