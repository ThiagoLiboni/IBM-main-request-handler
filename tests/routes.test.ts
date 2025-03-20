import request from 'supertest';
import express from 'express';
import { routes } from '../src/routes';
import { Authenticate } from 'authentication-api-ibm';

const app = express();
app.use(express.json());
app.use(routes);


beforeAll(()=>{Authenticate.createTokenTemporary({isForTest:true})})