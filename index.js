const express = require('express')
//cors to fix cors origin, body-parser to fix the post value on the server
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const admin = require('firebase-admin')
const serviceAcct = require('./.env/mag-405ea-f79f6813441e.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAcct)
})

const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/fizz/:count?', (req, res) => {
    let str = ''
    let arr = []

    if(req.params.count) {
        let count = 0
        const maxcount = req.params.count
    
        while(count <= maxcount) {
            if(count != 0) {
                if(count % 3 == 0 && count % 5 == 0) {
                    arr.push(`[ ${count} fizz-buzz ]`)
                } else if(count % 3 == 0) {
                    arr.push(`[ ${count} fizz ]`)
                } else if(count % 5 == 0) {
                    arr.push(`[ ${count} buzz ]`)
                }
            }
            count++
        }
        str = arr.join(' ')
    } else {
        str = "There's no Count... insert a count in the URL to see Fizz-Buzz in action!"
    }
    res.send(str)
})

app.get('/api/vw-calc/:model?', (req, res) => {
    if(req.params.model) {
        const model = (req.params.model).toUpperCase()
        res.send(`VW Calc ${model}`)
    } else {
        res.send("VW Calc General")
    }
})

// Firebase Example 'GET all stores'
app.get('/api/stores', async (req, res) => {
    const coll = db.collection('stores')
    const snap = await coll.get()
    const stores = []
    snap.forEach(doc => {
        stores.push({[doc.id]: doc.data()})
    })
    res.send(stores)
})
// Firebase Example 'ADD store by AutoGenID'
app.post('/api/stores', async (req, res) => {
    await db.collection('stores').add(req.body)
    console.log("Document Added!")
})
// Firebase Example 'GET store by AutoGenID'
app.get('/api/stores/:id', async (req, res) => {
    const coll = db.collection('stores')
    const snap = await coll.get()
    snap.forEach(doc => {
        if(doc.id === req.params.id) {
            res.send(doc.data())
        }
    })
})
// Firebase Example 'Update Item'
app.put('/api/stores/:id', async (req, res) => {
    await db.collection('stores').doc(req.params.id).update(req.body)
    console.log(`${req.params.id} Updated`)
})
app.delete('/api/stores/:id', async (req, res) => {
    await db.collection('stores').doc(req.params.id).delete()
    .then(() => {
        console.log("Document Deleted!")
    })
    .catch(err => {
        console.log("Error removing Document: ", err)
    })
})
// Firebase Example 'GET store by AutoGenID'
app.get('/api/store-by-id/:id', async (req, res) => {
    const coll = db.collection('stores')
    const snap = await coll.get()
    let store = {}
    snap.forEach(doc => {
        if(doc.id === req.params.id) {
            store = doc.data()
        }
    })
    res.send(store)
})
// Firebase Example 'GET store by name'
app.get('/api/store-by-name/:name', async (req, res) => {
    const coll = db.collection('stores')
    const snap = await coll.get()
    let store = {}
    snap.forEach(doc => {
        if(doc.data().name === req.params.name) {
            store = doc.data()
        }
    })
    res.send(store)
})
// Firebase Example 'GET store by abbr'
app.get('/api/store-by-abbr/:abbr', async (req, res) => {
    const coll = db.collection('stores')
    const snap = await coll.get()
    let store = {}
    snap.forEach(doc => {
        if(doc.data().abbr === req.params.abbr) {
            store = doc.data()
        }
    })
    res.send(store)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})