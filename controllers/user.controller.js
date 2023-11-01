import pool from '../db.js';

export class UserController {
    async createUser(req, res) {
        const { name, surname } = req.body;
        const newPerson = await pool.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname]);
        console.log(newPerson);
        res.json(newPerson);
    }

    async deleteUser(req, res) {
    }

    async updateUser(req, res) {
    }

    async getOneUser(req, res) {
    }

    async getAllUsers(req, res) {
    }

}