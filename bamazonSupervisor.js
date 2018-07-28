var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'kvgsql',
    database: 'bamazonDB'
});

function start() {
    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'query',
            message: 'What would you like to do?',
            choices: ['View Sales by Department', 'Create New Department']

        }
    ).then(function (answer) {
        response = answer.query;
        switch (response) {
            case 'View Sales by Department':
                makeArray();
                break;
            case 'Create New Department':
                showLow();
                break;
            default:
                console.log("Not a valid choice.")
        }
    });
}

var departmentArray = [];





function makeArray() {
    connection.query(
        "SELECT * FROM departments",
        function (error, response) {
            if (error) {
                console.log("There was error.")
                return;
            }
            if (!error) {
                for (var i = 0; i < response.length; i++) {
                    departmentArray.push(response[i].department_name);
                }
                console.log(departmentArray);
                for (var i = 0; i < departmentArray.length; i++){
                    connection.query(`SELECT product_sales FROM products WHERE department_name = '${departmentArray[i]}'`, function (error, response) {
                        if (error) {
                            console.log("Odd syntax error.");
                            return;
                        } else {
                            console.log(response)
                            for (var i =0; i< response.length; i++){
                                var newTotal = 0
                                var updatedTotal = newTotal + response[i].product_sales
                                console.log(updatedTotal)
                            }
                        }
                    })
                }
            }
        }
    )
}


start();