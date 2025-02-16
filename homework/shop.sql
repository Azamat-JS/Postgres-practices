CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP DATABASE IF EXISTS shop;
CREATE DATABASE shop;

\c shop

1. CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

1. CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_price NUMERIC(10,2) NOT NULL
);

2. CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT CHECK (amount > 0),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);


3. insert into customers(customer_name, phone) 
values
('nodir', '3331277'),('olim', '8887711'),
('komil', '9991289'),('umid', '9874512'),
('nodir', '3331277'),('olim', '8887711'),
('jamol', '9875600'),('umar', '9874512'),
('nodir', '3331277'),('olim', '8887711'),
('laziz', '9871256'),('umid', '9874512'),
('anvar', '9827343'),('obid', '0005572'),
('komil', '9991289'),('umid', '9874512');

3. insert into products(product_name, product_price)
values
('bread', 4000),('milk', 7000),
('meat', 100000),('apple', 5000),
('banana', 24000),('juice', 17000),
('meat', 100000),('apple', 5000),
('beef', 114000),('ice-cream', 7000),
('orange', 11000),('onion', 5000),
('tomato', 4000),('potato', 7000),
('sweets', 10000),('cream', 5000),
('garlic', 4000),('avocado', 7000),
('kiwi', 14000),('lemon', 5000),
('sugar', 14000),('cola', 7000),
('honey', 100000),('water', 5000);

3. insert into orders(customer_id, product_id, amount)
values
(5, 4, 7),(9, 12, 5),(2, 10, 1),
(5, 20, 2),(12, 12, 4),(2, 8, 1);


4. SELECT
o.order_id,
c.customer_name,
p.product_name,
o.amount
from orders o
LEFT OUTER JOIN products p ON o.product_id = p.product_id
LEFT OUTER JOIN customers c ON o.customer_id = c.customer_id;

4. SELECT
o.order_id,
c.customer_name,
p.product_name,
o.amount
from orders o
RIGHT JOIN customers c ON o.customer_id = c.customer_id
RIGHT JOIN products p ON o.product_id = p.product_id;

4. SELECT
o.order_id,
c.customer_name,
p.product_name,
o.amount
from orders o
FULL JOIN customers c ON o.customer_id = c.customer_id
FULL JOIN products p ON o.product_id = p.product_id;

///////////// Additional tasks 

DROP DATABASE IF EXISTS school;
CREATE DATABASE school;

\c school

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(40) NOT NULL,
    student_age INTEGER NOT NULL,
    student_email VARCHAR(50) NOT NULL UNIQUE,
    student_address VARCHAR(50) NOT NULL
);

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE enrollments (
    student_id UUID,
    course_id UUID,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

INSERT INTO students(student_name, student_age, student_address, student_email)
VALUES('botir', 23, 'nukus', 'botir@gmail.com'),
('nodir', 22, 'urganch', 'nodir@hotmail.com'),
('zohid', 24, 'tashkent', 'z@yahoo.com'),
('komil', 25, 'andijon', 'komil@hotmail.com'),
('zafar', 20, 'jizzax', 'zafar@yahoo.com'),
('jasur', 21, 'samarqand', 'jasur@hotmail.com'),
('umid', 24, 'buxoro', 'umid@yahoo.com'),
('javlon', 22, 'urganch', 'ja@hotmail.com'),
('olim', 24, 'tashkent', 'olim@yahoo.com');

INSERT INTO courses(course_name)
VALUES('english'),('history'),
('physics'),('maths'),
('biology'),('chemistry'),
('astronomy'),('russian');

INSERT INTO enrollments(student_id, course_id)
VALUES('00d07c96-2cfa-46a5-bc1d-12a82b5eee4a', 'ee63cdff-4edc-4e04-b030-572ce28c765f'),
('4c0ed2d9-b0ae-4729-a8b3-d6e5906763a8', '29c78d65-c2b5-4d15-9b16-40de18e52797'),
('56ee7365-ee50-4d47-8797-88568abb505d', '62386ba3-09b0-4797-8a3e-ce1e0f27aa32'),
('00d07c96-2cfa-46a5-bc1d-12a82b5eee4a', '29c78d65-c2b5-4d15-9b16-40de18e52797'),
('56ee7365-ee50-4d47-8797-88568abb505d', '7a3657dd-b455-43f8-8edb-20023c0f99fa');

SELECT
s.student_name,
c.course_name
from enrollments e
LEFT JOIN students s ON e.student_id = s.id
LEFT JOIN courses c ON e.course_id = c.id;

SELECT
s.student_name,
c.course_name
from enrollments e
RIGHT JOIN students s ON e.student_id = s.id
RIGHT JOIN courses c ON e.course_id = c.id;

SELECT
s.student_name,
c.course_name
from enrollments e
FULL JOIN students s ON e.student_id = s.id
FULL JOIN courses c ON e.course_id = c.id;