import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import ai from './ai.js'
import f from './files.js'

const names = JSON.parse(await f.readLines(process.env.FILE_JSON_NAMES))
const words = JSON.parse(await f.readLines(process.env.FILE_JSON_WORDS))

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: process.env.CORS_ALLOWED_ORIGINS
            ? process.env.CORS_ALLOWED_ORIGINS.split(' ')
            : '*',
        credentials: true,
    })
)

app.use(morgan('combined'))

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}`)
)

app.get('/', (req, res) => {
    return res.send('Receive a GET HTTP method')
})

app.get('/api/avatar', async (req, res) => {
    try {
        const avatar_file = await f.readLines('./avatars/1.png')
        const avatar_base64 = Buffer.from(avatar_file).toString('base64')
        console.log(avatar_base64)
        res.send(avatar_base64)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/api/sentence', (req, res) => {
    try {
        const sentence = ai.generateSentence_v3(words)
        res.send(`${sentence}`)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/api/sentence', (req, res) => {
    try {
        if (req.body.num_words === '') {
            throw new Error('Number of words is not specified')
        }
        const request_number = req.body.num_words
        const s = ai.generateSentence_v3(words)
        let sentence_array = []
        sentence_array = s.split(' ')
        if (request_number > sentence_array.length) {
            const n = Math.ceil(
                (request_number - sentence_array.length) / sentence_array.length
            )
            for (let i = 0; i < n; i++) {
                sentence_array = sentence_array.concat(
                    ai.generateSentence_v3(words).split(' ')
                )
            }
        }
        const sentence = sentence_array.slice(0, request_number).join(' ')
        res.send(`${sentence}`)
    } catch (e) {
        console.error(e)
        res.status(400).send()
    }
})

app.get('/api/name', (req, res) => {
    try {
        const name = ai.generateName(names)
        res.send(`${name}`)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/api/human_says', (req, res) => {
    try {
        const name = ai.generateName(names)
        const sentence = ai.generateSentence_v3(words)
        res.send(`${name}: ${sentence}`)
    } catch (e) {
        res.status(400).send(e)
    }
})
