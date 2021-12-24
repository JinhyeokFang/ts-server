import { Router } from 'express';

export interface Controller {
    baseURL: string;
    router: Router;
}
