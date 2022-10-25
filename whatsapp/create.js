const express = require('express');
const app = express();
const qrcode = require('qrcode')
const db1 = require('../connection/database');
const sha1 = require('sha1');
const { Client, LocalAuth } = require('whatsapp-web.js');
var bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { numberWAFormat, formatDate } = require('../helper/format');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/create', [
    body('client_id').notEmpty(),
    body('user_id').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({ msg}) => {
        return msg;
    })

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            message: errors.mapped()
        })
    }
    
    if (!req.body.client_id) {
        res.status(400).send({
            status: 400,
            message: 'client_id is required'
        });
    }

    const client = new Client({
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu'
            ]
        },
        authStrategy: new LocalAuth({
            restartOnAuthFail: true,
            clientId: req.body.client_id,
        }),
    })

    client.initialize()

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            qr_url = url;
            res.send(`<img src="${url}" />`);
            console.log('QR URL', url);
        })
    })

    client.on('authenticated', (session) => {
        console.log('AUTHENTICATED', session);

        var token = sha1(req.body.client_id + req.body.user_id + 'secret_key_whatsapp')
        var sql = "INSERT INTO `client_sessions` (`name`, `user_id`, `token`) VALUES ('" + req.body.client_id + "', '" + req.body.user_id + "', '" + token + "')";
        db1.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        })
    })

    client.on('ready', async () => {
        console.log('Client is ready!');
    })

    client.on('message', message => {
        let name;
    
        if (message.notifyName === undefined || message.notifyName === null) {
            name = message.from;
        } else {
            name = message.notifyName;
        }
    
        const queryCek = "SELECT * FROM `contacts` WHERE `chatId` = '" + message.from + "'";
        db1.query(queryCek, function (err, result) {
            if (err) throw err;
            console.log('cek', result);
            if (result.length === 0) {
                const query = "INSERT INTO `contacts` (`chatId`, `name`, `phone`, `created_at`, `updated_at`) VALUES ('" + message.from + "', '" + name + "', '" + numberWAFormat(message.from) + "', '" + formatDate(new Date()) + "', '" + formatDate(new Date()) + "')";
                db1.query(query, function (err, result) {
                    if (err) throw err;
                    console.log('insert', result);
                })
            }
        })
    
        if (message.body === 'ping') {
            message.reply('pong');
        }
    })

    client.on('auth_failure', async () => {
        console.log('Auth Failure');
    })

    client.on('disconnected', async () => {
        console.log('Client is disconnected!');
    })
})

module.exports = app;