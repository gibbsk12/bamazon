USE bamazonDB;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Books', 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Kitchen', 50000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Makeup', 10000);

ALTER TABLE departments
ADD COLUMN product_sales INT AFTER over_head_costs;

ALTER TABLE departments
ADD COLUMN total_profit INT AFTER product_sales;

SELECT 
    *
FROM
   departments;