const db1 = require('../connection/database');
const { Client, LocalAuth } = require('whatsapp-web.js');
const routeWA = require('express')();
const bodyParser = require('body-parser');
const { formatDate, numberWAFormat } = require('../helper/format');
const { body, validationResult } = require('express-validator');

routeWA.use(bodyParser.json());
routeWA.use(bodyParser.urlencoded({ extended: false }));

const client = new Client({
    puppeteer: {
        headless: true,
    },
    authStrategy: new LocalAuth({
        restartOnAuthFail: true,
        clientId: 'yusep',
    })
})

client.initialize()

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

routeWA.get('/contacts', (req, res) => {
    client.getChats().then((chats) => {
        res.send({
            status: 200,
            message: 'success',
            data: chats
        })
    })
})

routeWA.post('/send-message', [
    body('phone').notEmpty(),
    body('message').notEmpty()
], async (req, res) => {
    const error = validationResult(req).formatWith(( { msg} ) => {
        return msg;
    })

    if (!error.isEmpty()) {
        return res.status(422).send({
            status: 422,
            message: error.mapped()
        })
    }

    client.getChatById(req.body.phone).then(chat => {
        chat.sendMessage(req.body.message);
        res.send({
            status: 200,
            message: 'Message sent'
        });
    })
})

module.exports = {
    routeWA
}