const express = require('express');
const router = express.Router();

const { User } = require('../models/user')
const { Code } = require('../models/code')

const _ = require('lodash');

const { authenticate } = require('../middleware/authenticate')
const qrcode = require('qrcode')

router.get('/', authenticate, async (req, res) => {

    const all = await Code.find({
        owner: req.user._id
    })

    res.send(all)
})

router.get('/retrieve/:identifier', async (req, res) => {

    const {identifier} = req.params
    const found = await Code.findOne({
        identifier
    })

    res.send(found)
})

router.post('/new', authenticate, async (req, res) => {

    const obj = new Code({
        owner: req.user._id
    })

    obj.save()
        .then(async () => {

            const all = await Code.find({
                owner: req.user._id
            })

            res.send(all)
        })
        .catch((e) => {
            console.log('error', e)
            if (e.code === 11000) {
                res.status(409).send({
                    errorMessage: 'Username already exists'
                })
            } else {
                res.status(401).send(e)
            }
        })
})

router.get('/qr/:_id', async (req, res) => {

    const {_id} = req.params
    const found = await Code.findOne({
        _id
    })

    const qr = await qrcode.toDataURL('https://qurra.azurewebsites.net/land/'+found.identifier)

    res.send({
        qr
    })
});

router.patch('/:_id', async (req, res) => {

    const {_id} = req.params
    const body = _.pick(req.body, ['context'])

    const obj = await Code.findOneAndUpdate({
        _id
    }, {
        ...body
    }, {
        new: true
    })

    res.send(obj)
});

module.exports = router;