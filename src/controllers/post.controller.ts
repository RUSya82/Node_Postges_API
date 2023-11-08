import { BaseController } from './base.controller';
import {PostService} from '../services/post.service';
import pool from '../db';
import { IPostService } from '../core/post.service.interface';

export class PostController extends BaseController {
    constructor(private postService: IPostService) {
        super();
    }

    async createPost(req, res) {
        try {
            const newPost = await this.postService.create(req.body);
            if (!newPost.rowCount) {
                throw new Error(`Post not created`);
            }
            this.created(res, newPost.rows[0]);
        } catch (e) {
            this.error(res, e.message);
        }
    }

    async getPostByUser(req, res) {
        const id = req.params.id;
        try {
            const post = await this.postService.getByUser(id);
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

    async getOne(req, res) {
        const id = req.params.id;
        try {
            const post = await this.postService.getOne(id);
            console.log(post.rows);
            if (!post.rowCount) {
                throw new Error(`posts with id = ${id} not found`);
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