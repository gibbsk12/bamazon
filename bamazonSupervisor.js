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
                viewSales();
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
var informationArray = [];

function viewSales() {
    makeArray();
}


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
                for (i = 0; i < departmentArray.length; i++) {
                    connection.query(
                        `SELECT * FROM products WHERE department_name = '${departmentArray[i]}'`,
                        function (error, response) {
                            if (error) {
                                console.log("There was error.")
                                return;
                            }
                            if (!error) {
                                var deptTotal = 0;
                                for (i = 0; i < response.length; i++) {
                                    deptTotal = deptTotal + response[i].product_sales
                                    var dept = response[i].department_name
                                }
                                informationArray.push({
                                    department: dept,
                                    sales: deptTotal
                                })
                            }
                            console.log(informationArray);
                        }
                    )
                }
            }
        }
    )
}

setTimeout(function updateArray() {
    console.log("Here"+informationArray)
}, 2000);

start();