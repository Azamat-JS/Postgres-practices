
create database taskmanager;

\c taskmanager;

create type category_enum AS enum('educational', 'chores', 'work');
create type title_enum AS enum('new', 'inProcess', 'test', 'done');
create type color_enum AS enum('red', 'green', 'blue', 'yellow');

create table tasks(
    taskId serial primary key,
    title title_enum not null,
    kind varchar(50) not null,
    color color_enum not null,
    category category_enum not null,
    created_by varchar(50) not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

create table users(
    userId serial primary key,
    username varchar(50) not null,
    userrole varchar(40) not null,
    email varchar(50) not null,
    parol varchar(50) not null
);

