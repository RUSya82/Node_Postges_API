import pool from '../db';
import { IUserService } from '../core/user.service.interface';
import { CreateUserDto } from '../core/dto/createUser.dto';
import { UpdateUserDto } from '../core/dto/updateUser.dto';
import { FindUserDto } from '../core/dto/findUser.dto';
import { User} from '../core/entity/user.entity';

export class UserService implements IUserService{
    async create(user: CreateUserDto) {
        const { name, surname, email, password } = user;
        const newUser = new User(email, name, surname);
        console.log(email, name, surname, password);
        await newUser.setPassword(password, 10);
        return await pool.query('INSERT INTO person (name, surname, email, password) values ($1, $2, $3, $4) RETURNING *', [newUser.name, newUser.surname, newUser.email, newUser.password]);
    }

    async delete(id: number) {
        const res = await pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id]);
        console.log(typeof res);
        return res;
    }

    async update(user: UpdateUserDto) {
        const { email, name, surname } = user;
        return await pool.query('UPDATE person set name = $1, surname = $2 where email = $3 RETURNING *', [name, surname, email]);
    }

    async getOne(id: number) {
        return await pool.query('SELECT * FROM person WHERE id = $1 ', [id]);
    }

    async find(user: FindUserDto) {
        const { email, name, surname } = user;
        return  await pool.query('SELECT * FROM person WHERE name = $1 OR surname = $2 OR email = $3', [name, surname, email]);
    }

    async getAll(limit = 100) {
            return  await pool.query('SELECT * FROM person LIMIT $1', [limit]);
    }
}