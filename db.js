import pkg from 'pg';
const {Pool} = pkg;


const pool = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

export default pool;