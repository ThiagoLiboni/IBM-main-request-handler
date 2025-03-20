import express from 'express'
import {routes} from './routes'

const app = express()
const port = process.env.PORT
const base = process.env.BASE_prefix || "/"

app.use(express.json());

app.use(base?.toString(), routes)

app.listen(port, ()=>{
    console.log('requests server starting:', port)
})