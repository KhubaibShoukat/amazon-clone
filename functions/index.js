const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const { request } = require("express");
const { response } = require("express");
const stripe = require("stripe")("sk_test_51KqZYiBsLACWkwtwGetU5GAK2SrI5UOWT1WMSDNAnDMhtYEv0QLPQtqVBppv8ZWEsygyuXVa691IEn1oRvr6IEzo00cNoMTiOg")

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/', (request, response) => response.status(200).send('Hello Khubaib'))

app.post('/payment/create', async (request, response) => {
    const total = request.query.total

    const paymentIndent = await stripe.paymentIndent.create({
        amount: total,
        currency: 'usd'
    })
    response.status(201).send({
        clientSecret: paymentIndent.client_secret,
    })
})

exports.api = functions.https.onRequest(app)