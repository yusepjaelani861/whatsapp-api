# Whatsapp API using whatsapp-web.js
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Whatsapp API yang dibuat oleh [Yusep Jaelani](https://facebook.com/yusep.jaelani.77).

## Server Requirement
- Node v18.6.0
- NPM 8.13.2
- Mysql 5.7

## Development
Want to contribute? Great! Whatsapp API uses ExpressJS for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

```sh
- npm install
- npm start
```

## Setup Database
Import file whatsapp-api.sql to your database/mysql.
Then, configuration file config.json to connect database.
```
"database": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "",
        "database": "whatsapp-api"
},
"secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3000
```
## Authorization
Bearer {token}

## License
MIT


