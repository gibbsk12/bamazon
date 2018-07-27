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

function viewSales(){
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function (error, response) {
            if (error) {
                console.log("There was error.")
                return;
            }
            if (!error) {
                console.log(`\nThe following items have low inventory:`);
                for (var i = 0; i < response.length; i++) {
                    // itemArray.push({
                    //     id: response[i].item_id,
                    //     item: response[i].product_name,
                    //     price: response[i].price,
                    //     quantity: response[i].stock_quantity
                    // });
                    console.log(`${response[i].item_id}--${response[i].product_name}--${response[i].stock_quantity} in stock.\n`)
                }
                start();
            }
        }
    )
}
}