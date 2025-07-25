import express from 'express';
import "dotenv/config";
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from './winston.js';
import {requestContext} from "../router/middleware/requestContext.js";

const app = express();
app.use(requestContext);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(winston);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

export default app;
