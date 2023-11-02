import { BaseController } from './base.controller.js';
import pool from '../db.js';

export class PostController extends BaseController {
    constructor() {
        super();
    }

    async createPost(req, res) {
        const {title, content, user_id} = req.body;
        try {
            const newPost = await pool.query('INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *', [title, content,user_id]);
            if (!newPost.rowCount) {
                throw new Error(`Post not created`);
            }
            console.log('Post for user ' + newPost.rows[0].user_id + ' created with id = ' + newPost.rows[0].id);
            this.created(res, newPost.rows[0]);
        } catch (e) {
            this.error(res, e.message);
        }
    }

    async getPostByUser(req, res) {
        const id = req.params.id;
        try {
            const post = await pool.query('SELECT * FROM post WHERE user_id = $1 ', [id]);
            if (!post.rowCount) {
                throw new Error(`posts with user_id = ${id} not found`);
            } else {
                this.ok(res, post.rows);
                console.log(post.rows);
            }
        } catch (e) {
            console.log(e.message);
            this.error(res, e.message);
        }
    }
}