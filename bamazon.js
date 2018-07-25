const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'iwgtlBIAS!851sql',
    database: 'bamazonDB'
});

var response;
var itemArray = [];
var itemList = [];


function showInventory(){
    connection.query(
        "SELECT * FROM products",
        function (error, response){
            if (error){
                console.log("Connection failed.")
                return;
            }
            if (!error){
                for (var i = 0; i < response.length; i++){
                    itemArray.push({
                        item: response[i].product_name,
                        price: response[i].price,
                        department: response[i].department_name,
                        quantity: response[i].stock_quantity
                    });
                    itemList.push(response[i].product_name);
                }
                console.table(itemArray);
            }
        }
    )

}


function askUser(){
    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'itemChoice',
            message: 'What would you like to buy?',
            choices: itemList
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?'
        }
    ).then(function(answer){
        console.log(answer.itemChoice)
        console.log(answer.quantity);
    })
};

showInventory();
askUser();


// function start(){
//     console.log(`Welcome to Bamazon! \n Check out our inventory! \n`)
//     showInventory();
//     console.log(`\n`)

// }

// start();



// ).then(function (answer) {
//     response = answer.query;
//     switch (response) {
//         case 'POST':
//             postItem();
//             break;
//         case 'BID':
//             bidItem();
//             break;
//     }
// });