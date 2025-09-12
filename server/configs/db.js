import {neon} from '@neondatabase/serverless';
import express from 'express';
const sql = neon(`${process.env.DATABASE_URL}`);
export default sql;
