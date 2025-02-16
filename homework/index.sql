CREATE EXTENSION IF NOT EXISTS pgcrypto;

1. create database car;
2. DROP TABLE IF EXISTS car;
3. create table car(
    car_id serial primary key,
    brand VARCHAR(50) NOT NULL,
    price integer NOT NULL,
    year integer NOT NULL
);
4. ALTER TABLE car RENAME COLUMN brand TO model;
5. ALTER TABLE car DROP COLUMN year;
6. ALTER TABLE car ADD COLUMN year integer;
7. ALTER TABLE car RENAME TO automobiles;

8. INSERT INTO automobiles(model, price, year)
      VALUES('Nexia', 120000, 2020);
      
    INSERT INTO automobiles(model, price, year)
      VALUES('Spark', 129000, 2021);

    INSERT INTO automobiles(model, price, year)
      VALUES('Damas', 140000, 2022);

    INSERT INTO automobiles(model, price, year)
      VALUES('Malibu', 150000, 2023);

9. select model, price from automobiles where year = 2020;
10. update automobiles SET year = 2021 where model = 'Malibu';
11. delete from automobiles where year = 2021;


