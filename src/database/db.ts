import Pool from 'pg-pool';
require ('dotenv').config();

export const connection = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const initDB = async () => {
    try {
        await connection.connect();
        console.log('Connected to database successfully!');
    } catch (err) {
        console.error('Error connecting to database...', err);
        throw err;
    }
};