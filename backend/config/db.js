import {neon} from '@neondatabase/serverless'

import dotenv from 'dotenv'
dotenv.config();

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE } = process.env;

// create a new connection to the database
export const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`);