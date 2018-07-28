var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kvgsql',
    database: 'bamazonDB'
});
var itemArray = [];

function start() {
    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'query',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

        }
    ).then(function (answer) {
        response = answer.query;
        switch (response) {
            case 'View Products for Sale':
                showInventory();
                break;
            case 'View Low Inventory':
                showLow();
                break;
            case 'Add to Inventory':
                addItem();
                break;
            case 'Add New Product':
                createNew();
                break;
            default:
                console.log("Not a valid choice.")
        }
    });
}

function showInventory() {
    empty();
    connection.query(
        "SELECT * FROM products",
        function (error, response) {
            if (error) {
                console.log("There was error.")
                return;
            }
            if (!error) {
                for (var i = 0; i < response.length; i++) {
                    itemArray.push({
                        id: response[i].item_id,
                        item: response[i].product_name,
                        price: response[i].price,
                        quantity: response[i].stock_quantity
                    });
                }
                console.log(`\nWe have the following items in stock:`)
                console.table(itemArray);
                start();
            }
        }
    )
}

function showLow() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function (error, response) {
            if (error) {
                console.log("There was error.")
                return;
            }
            if (!error) {
                console.log(`\nThe following items have low inventory:`);
                for (var i = 0; i < response.length; i++) {
                    console.log(`${response[i].product_name} (Item ID: ${response[i].item_id})-- There are ${response[i].stock_quantity} in stock.\n`)
                }
                start();
            }
        }
    )
}

function addItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemChoice',
            message: 'Please enter ID of the item you wish to update.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many items would you like to add to our inventory?'
        }
    ]).then(function (answer) {
        var item = parseInt(answer.itemChoice);
        var quantity = parseInt(answer.quantity);
        connection.query(`SELECT * FROM products WHERE item_id = ${item}`, function (error, response) {
            if (error) {
                console.log("There was an error.");
                return;
            } else {
                productData = response[0];
                var newTotal = productData.stock_quantity + quantity
                connection.query(`UPDATE products SET stock_quantity = ${newTotal} WHERE item_id = ${item}`, function (error, response) {
                    if (error) {
                        console.log("Quantity update failed.");
                        return;
                    } else {
                        console.log(`\nThank you for the update. We now have ${newTotal} ${productData.product_name} in stock.\n`)
                        start();
                    }
                })

            }
        })
    })
}

function empty(){
    itemArray.length = 0;
}

function createNew(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemName',
            message: 'What item would you like to add?',
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department does your item belong to?',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What should be the price for the item?',
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many are being added to the inventory?'
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.itemName,
                department_name: answer.department,
                price: parseInt(answer.price),
                stock_quantity: parseInt(answer.quantity)
            },
            function (err, res) {
                if (err) {
                    console.log("bad code");
                    return;
                }
                if (!err) {
                    console.log(`\nWe have successfully added ${answer.itemName} to the inventory. We have ${answer.quantity} in stock.\n`)
                    start();
                }

            }
        );
    })
}

start();