const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router()
const routes = require('./routes')
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
routes(router)
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/api', router)

let port = process.env.PORT || 5000
app.set('port', (process.env.PORT || 5000));
app.listen(port, () => {
    console.log('Server Start')
})