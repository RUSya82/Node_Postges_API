import pool from '../db.js';
import { BaseController } from './base.controller.js';

export class UserController extends BaseController {
    constructor() {
        super();
    }

    async createUser(req, res) {
        const { name, surname } = req.body;
        try {
            const newPerson = await pool.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname]);
            if (!newPerson.rowCount) {
                throw new Error(`User not created`);
            }
            console.log('user ' + newPerson.rows[0].name + ' created with id = ' + newPerson.rows[0].id);
            this.created(res, newPerson.rows[0]);
        } catch (e) {
            this.error(res, e.message);
        }

    }

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const user = await pool.query('DELETE FROM person WHERE id = $1 ', [id]);
            if (!user.rowCount) {
                throw new Error(`user with id = ${id} not found`);
            }
            console.log(user.rows[0]);
            this.send(res, 200, user.rows[0]);
        } catch (e) {
            console.log(e.message);
            this.error(res, e.message);
        }
    }

    async updateUser(req, res) {
        const { id, name, surname } = req.body;
        try {
            const user = await pool.query('UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id]);
            if (!user.rowCount) {
                throw new Error(`User with id = ${id} not found`);
            }
            this.ok(res, user.rows[0]);
            console.log(user.rows[0]);
        } catch (e) {
            console.log(e);
            this.error(res, e.message);
        }
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        try {
            const user = await pool.query('SELECT * FROM person WHERE id = $1 ', [id]);
            if (!user.rowCount) {
                throw new Error(`user with id = ${id} not found`);
            } else {
                this.ok(res, user.rows[0]);
                console.log(user.rows[0]);
            }
        } catch (e) {
            console.log(e.message);
            this.error(res, e.message);
        }
    }

    async findUser(req, res){
        const { id, name, surname } = req.body;
        const users = await pool.query('SELECT * FROM person WHERE name = $1 OR surname = $2', [name, surname]);
        console.log(users.rows[0]);
        this.ok(res, users.rows);
    }

    async getAllUsers(req, res) {
        try{
            const users = await pool.query('SELECT * FROM person');
            if(!users.rowCount){
                throw new Error(`No users in database`);
            }
            this.ok(res, users.rows);
        } catch (e){
            console.log(e.message);
            this.error(res, e.stack);
        }
    }

}