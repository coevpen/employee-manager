const startPrompt = require('./index');
const mysql = require('mysql2/promise');
require('dotenv').config();

// gets database connection and calls the start prompt
async function main(){
    const db_connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });

    console.log(
        `         ---------------------------------------------------
        |                                                   |
        |                 Welcome To                        |
        |                                                   |
        |               Employee Manager                    |
        |                                                   |
         ---------------------------------------------------`
    );

    startPrompt.mainMenu();
}

main();