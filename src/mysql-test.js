var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'rm-bp10gkx87o2esw70bco.mysql.rds.aliyuncs.com',
    user: 'root',
    password: 'Czacza-20001207',
    database: 'patient_info'
});

connection.connect();

//查
connection.query('SELECT first, second, name from department', function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    result.array.forEach(element => {
        console.log(element);
    });

});

connection.end();