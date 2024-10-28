import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();
const api = new App();

export const server = api.listen();
