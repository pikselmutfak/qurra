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

    const qr = await qrcode.toDataURL(JSON.stringify({
        _id
    }))

    res.send({
        qr
    })
});

module.exports = router;