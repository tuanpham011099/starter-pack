import env from 'dotenv';
import express from 'express';

env.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App running on port: ', PORT));
