import { QueryResult } from 'pg';
import { CreatePostDto } from './dto/createPost.dto';

export interface IPostService{
    create: (dto: CreatePostDto) => Promise<QueryResult | null>;
    getByUser: (id: number) => Promise<QueryResult | null>;
    getOne: (id: number) => Promise<QueryResult | null>;

}