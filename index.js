const mysql = require('mysql');

const inquirer = require('inquirer');

const envPass = require("./pass/pass");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: envPass,

    database: "playlist_db"

});
connection.connect(err => {
    if (err) throw err;
    console.log(`connected as id: ${connection.threadId}`)
    songQuery();
})
function songQuery () {
    inquirer.prompt([{
        type: "list",
        name: "key",
        message: "search method:",
        choices: ["artist", "genre"]
    },
    {
        type: "input",
        name: "value",
        message: "Search term?:"
    }
])
.then (({key, value}) => {
    connection.query(`SELECT * FROM songs WHERE ${key}='${value}'`, (err, res) => {
        if (err) throw err;
        for (element of res) {
            console.log (`"${element.title}" by ${element.artist} | ${element.genre}`)
        }
        connection.end();
    })
} 
)

}
