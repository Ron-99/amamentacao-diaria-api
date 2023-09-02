import express from 'express'

const app = express()
import { router } from './routes'

app.use(express.json())

app.use('/history', router)

app.listen(10000, () => 'server is running on port 10000')