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
var itemArray = [];

function showInventory(){
    connection.query(
        "SELECT * FROM products",
        function (error, response){
            if (error){
                console.log("There was error.")
                return;
            }
            if (!error){
                for (var i = 0; i < response.length; i++){
                    itemArray.push({
                        id: response[i].item_id,
                        item: response[i].product_name,
                        price: response[i].price,
                        department: response[i].department_name
                    });
                }
                console.table(itemArray);
                askUser();
            }
        }
    )
}

function askUser(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemChoice',
            message: 'Please enter ID of the item you wish to purchase.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?'
        }
    ]).then(function(answer){
        var item = parseInt(answer.itemChoice);
        var quantity = answer.quantity;
        connection.query(`SELECT * FROM products WHERE item_id = ${item}`, function (error, response){
            if (error){
                console.log("There was an error.");
                return;
            }else {
                productData = response[0];
                if (productData.stock_quantity > quantity){
                    console.log(`Absolutely! We have ${productData.product_name} in stock!`)
                    var newTotal = productData.stock_quantity - quantity
                    var price = quantity*productData.price
                    connection.query(`UPDATE products SET stock_quantity = ${newTotal} WHERE item_id = ${item}`, function(error, response){
                        if (error){
                            console.log("Quantity update failed.");
                            return;
                        }else{
                            console.log(`Your total cost is $${price}.`)
                            var newSales = productData.product_sales + price
                            connection.query(`UPDATE products SET product_sales = ${newSales} WHERE item_id = ${item}`, function(error, response){
                                if (error){
                                    console.log("Quantity update failed.");
                                    return;
                                }else{
                                    askUser();
                                }
                            })
                         }
                    })
                }else{
                    console.log(`We apologize, but we only have ${productData.stock_quantity} in stock!`)
                    askUser();
                }
            }
        })
    })
};

showInventory();
