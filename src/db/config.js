const sqlite3 = require("sqlite3").verbose()
const { open } = require('sqlite')

module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })
