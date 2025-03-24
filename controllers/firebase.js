const admin = require('firebase-admin')
const serviceAcct = require('../.env/mag-405ea-f79f6813441e.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAcct)
})

const db = admin.firestore()

const getAll = async (req, res) => {
  try {
      let docs = []
      await db.collection(req.baseUrl).get()
      .then((items) => {
          items.forEach(item => {
              docs.push({ [item.id]: item.data() })
          })
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
  } catch(err) {
      res.status(500).json({ message: err.message })
  }
}

const getOne = async (req, res) => {
  try {
      await db.collection(req.baseUrl).doc(req.params.id).get()
      .then((item) => {
          res.status(200).json({ [item.id]: item.data() })
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
  } catch(err) {
      res.status(500).json({ message: err.message })
  }
}

const addOne = async (req, res) => {
  try {
      await db.collection(req.baseUrl).add(req.body)
      .then((item) => {
          res.status(200).json({ message: `Store ${item.id} was added` })
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
  } catch(err) {
      res.status(500).json({ message: err.message })
  }
}

const updateOne = async (req, res) => {
  try {
      const store = db.collection(req.baseUrl).doc(req.params.id)
      await store.update(req.body)
      .then((item) => {
        res.status(200).json({ message: `Store ${store.id} was updated` })
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
  } catch(err) {
      res.status(500).json({ message: err.message })
  }
}

const deleteOne = async (req, res) => {
  try {
      const store = db.collection(req.baseUrl).doc(req.params.id)
      await store.delete()
      .then((item) => {
          res.status(200).json({ message: `Store ${store.id} was deleted` })
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
  } catch(err) {
      res.status(500).json({ message: err.message })
  }
}

const getVwCalcGenericValues = async (req, res) => {
    try {
        await db.collection(req.baseUrl).doc('generic').get()
        .then((item) => {
            res.status(200).json(item.data())
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const getVwCalcOtherValues = async (req, res) => {
    try {
        await db.collection(req.baseUrl).doc('electric').get()
        .then((item) => {
            res.status(200).json(item.data())
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  getVwCalcGenericValues,
  getVwCalcOtherValues
}