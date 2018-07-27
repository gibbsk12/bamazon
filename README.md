# bamazon

This is the 9th homework assignment for the University of Richmond Coding Bootcamp.

In this assignment, we were asked to create an Amazon-like app with MySQL. This app has two interfaces--one for customers and one for managers.



## Getting Started 
1. Clone the repository. 
2. Run command `npm install` in Terminal.
3. Set up MySQL database. If you do not already have MySQL installed, you can visit [the installation page](https://www.mysql.com/) to install the correct version of MySQL for your machine. Once you have installed MySQL, create the Bamazon database used the SQL code in Bamazon.sql. 
4. Choose an interface below. 

### BamazonCustomer
The customer interface takes in orders from customers. If inventory is available, it will calculate the total cost for the customer and deplete the stock from the store's inventory. If inventory is not available, the app will alert the customer. 

![Customer View](https://media.giphy.com/media/25pU7OJCsW6qOlVtTy/giphy.gif)

To use the customer interface, simple type `node bamazonCustomer.js` in Terminal.


### Bamazon Manager
The manager interface allows the user to:
1. View Products for Sale 

![Manager View](https://media.giphy.com/media/SGVHMkk8N4JxSQ9CPo/giphy.gif)

2. View Low Inventory (Shows all products with a quantity less than 5)
3. Add to Inventory (Takes current inventory and updates quantity)

![See and Add to Low](https://media.giphy.com/media/3tMphVxUc47MYAHgcZ/giphy.gif)

4. Add New Product (Create and a new entry to the mySQL database)

![Create New Product](https://media.giphy.com/media/5h7QMsNndM7G8YR1Gy/giphy.gif)

To use the customer interface, simple type `node bamazonManager.js` in Terminal.

## Built With
* [Node.js](https://nodejs.org/en/)
* [Inquirer NPM Package](https://www.npmjs.com/package/inquirer)
* [MySQL NPM Package](https://www.npmjs.com/package/mysql) 
* [Console.table NPM Package](https://www.npmjs.com/package/console.table) 
