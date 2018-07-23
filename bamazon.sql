drop database if exists bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Steel Straws', 'Kitchen', 8, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Harry Potter', 'Books', 10, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('One Dark Throne', 'Books', 14, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The Hunger Games', 'Books', 12, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kitchenaid Mixer', 'Kitchen', 280, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('FiestaWare Plates', 'Kitchen', 30, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('OPI Nail Polish', 'Makeup', 7, 185);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('COSRX Facewash', 'Makeup', 11, 110);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lipsense', 'Makeup', 22, 140);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Wonder', 'Books', 13, 210);


SELECT 
    *
FROM
    products;