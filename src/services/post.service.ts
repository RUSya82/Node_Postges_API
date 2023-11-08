import pool from '../db';
import { QueryResult } from 'pg';
import {  IPostService } from '../core/post.service.interface';

export class PostService implements IPostService{
    async create(post): Promise<QueryResult | null> {
        const { title, content, user_id } = post;
        return await pool.query('INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *', [title, content, user_id]);
    }

    async getByUser(userId): Promise<QueryResult | null> {
        return  await pool.query('SELECT * FROM post WHERE user_id = $1 ', [userId]);
    }

    async getOne(postId): Promise<QueryResult | null> {
        return  await pool.query('SELECT * FROM post WHERE id = $1 ', [postId]);
    }
}