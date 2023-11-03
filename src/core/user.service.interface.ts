import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { QueryResult } from 'pg';

export interface IUserService {
    create: (dto: CreateUserDto) => Promise<QueryResult | null>;

    delete: (id: number) => Promise<QueryResult | null>;

    update: (dto: UpdateUserDto) => Promise<QueryResult | null>;

    getOne: (id: number) => Promise<QueryResult | null>;

    find: (dto: FindUserDto) => Promise<QueryResult | null>;

    getAll: (limit?: number) => Promise<QueryResult | null>
}