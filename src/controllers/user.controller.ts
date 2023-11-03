import { BaseController } from './base.controller';
import { IUserService } from '../core/user.service.interface';

export class UserController extends BaseController {

    constructor(private userService: IUserService) {
        super();
    }

    async createUser(req, res) {
        try {
            const newPerson = await this.userService.create(req.body);
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
            const user = await this.userService.delete(id);
            if (!user.rowCount) {
                throw new Error(`user with id = ${id} not found`);
            }
            console.log(user.rows);
            this.send(res, 200, user.rows[0]);
        } catch (e) {
            console.log(e.message);
            this.error(res, e.message);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await this.userService.update(req.body);
            if (!user.rowCount) {
                throw new Error(`User not found`);
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
            const user = await this.userService.getOne(id);
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

    async findUser(req, res) {
        try {
            const users = await this.userService.find(req.body);
            console.log(users.rows);
            await this.ok(res, users.rows);
        } catch (e) {
            console.log(e.message);
            this.error(res, e.message);
        }

    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAll();
            if (!users.rowCount) {
                throw new Error(`No users in database`);
            }
            await this.ok(res, users.rows);
        } catch (e) {
            console.log(e.message);
            this.error(res, e.stack);
        }
    }

}