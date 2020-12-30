import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';

// Initialize passport strategies
import './common/passport-init';

import routes from './router';

// config
import { webClientHost } from './config/app.config';

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: webClientHost,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'lang', 'fastoLang'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(routes);

export default app;
