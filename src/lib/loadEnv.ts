import { config } from 'dotenv';
import { resolve } from 'path';

// Load config.json and .env into process.env
config({ path: resolve(__dirname, '../.env') });
import './configToProcess';
