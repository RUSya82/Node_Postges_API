import pool from '../db';

export class UserService {
    async create(user) {
        const { name, surname } = user;
        return await pool.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname]);
    }

    async delete(id) {
        return await pool.query('DELETE FROM person WHERE id = $1 ', [id]);
    }

    async update(user) {
        const { id, name, surname } = user;
        return await pool.query('UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id]);
    }

    async getOne(id) {
        return await pool.query('SELECT * FROM person WHERE id = $1 ', [id]);
    }

    async find(user) {
        const { id, name, surname } = user;
        return  await pool.query('SELECT * FROM person WHERE name = $1 OR surname = $2', [name, surname]);
    }

    async getAll(limit = 100) {
            return  await pool.query('SELECT * FROM person LIMIT $1', [limit]);
    }
}