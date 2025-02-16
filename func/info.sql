
create type category_enum AS enum('cloth', 'technical', 'food');

create table product(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description text not null,
    category category_enum not null,
    quantity INTEGER NOT NULL,
    price FLOAT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

