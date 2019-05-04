import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'

const host = process.env.NODE_HOST || '0.0.0.0'
const port = process.env.NODE_PORT || 3000

const dbHost = process.env.DB_HOST
const dbUsername = process.env.DB_USERNAME
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD)
const dbName = process.env.DB_NAME

const mongodbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}`

const app = express();

mongoose
    .connect(
        mongodbUrl,
        {
            dbName: dbName,
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => { console.log('MongoDB connected') })
    .catch(err => console.log(err))

const schema = {}

app.use(
    '/graphql',
    bodyParser.json(),
    expressGraphQL({
        schema,
        graphiql: true
    })
);

app.listen(port, host, () => console.log(`Server running on port ${port}`));