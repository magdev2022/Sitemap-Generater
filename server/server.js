const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = express.Router()
const routes = require('./routes')
const app = express();
const path = require('path')
const url = process.env.MONGODB_URI || "mongodb+srv://kgh919:1991919@cluster0-81vhb.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch (error) {

}
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
routes(router)
app.use('/api', router)

let port = process.env.PORT || 5000
// app.set('port', (process.env.PORT || 5000));
app.listen(port, () => {
    console.log('Server Start')
})