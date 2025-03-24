const express = require('express')
//cors to fix cors origin, body-parser to fix the post value on the server
const cors = require('cors');
const bodyParser = require('body-parser');
const storeRoutes = require('./routes/stores')
const fizzyRoutes = require('./routes/fizzy')
const vwCalcRoutes = require('./routes/vwCalc')

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
app.use('/vw-calc', vwCalcRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})