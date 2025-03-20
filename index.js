const express = require('express')
//cors to fix cors origin, body-parser to fix the post value on the server
const cors = require('cors');
const bodyParser = require('body-parser');
const storeRoutes = require('./routes/stores')
const fizzyRoutes = require('./routes/fizzy')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use('/stores', storeRoutes)
app.use('/fizz', fizzyRoutes)

app.get('/api/vw-calc/:model?', (req, res) => {
    if(req.params.model) {
        const model = (req.params.model).toUpperCase()
        res.send(`VW Calc ${model}`)
    } else {
        res.send("VW Calc General")
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})