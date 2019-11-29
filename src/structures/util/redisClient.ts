import { createClient } from 'async-redis';

const db = createClient(process.env.CONNECTION_STRING);

export default db;
