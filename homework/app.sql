CREATE EXTENSION IF NOT EXISTS pgcrypto;

1. create database school;
2. alter database school rename to schools;
3. drop table if exists members;
4. create table members(
     member_id VARCHAR(50) unique not null default gen_random_uuid(),
     membername VARCHAR(50) not null,
     age integer
);
5. alter table members RENAME to pupils;
6. DROP TABLE pupils;
7.create table teachers(
    teacher_id serial primary key,
    teacher_name VARCHAR(30) not null,
    subject VARCHAR(40) not null
);
8. alter table teachers add COLUMN age integer;
9. alter table teachers rename COLUMN subject to lesson;
10. \d+ teachers;
11. insert into teachers(teacher_name, lesson, age)
      VALUES('sarvar', 'history', 34),
      ('laziz', 'biology', 26),
      ('jasur', 'maths', 29),
      ('mohir', 'physics', 30);

12. alter table teachers add COLUMN isMarried VARCHAR(10);
13. alter table teachers alter COLUMN isMarried type boolean USING (isMarried::boolean);
14. insert into teachers(teacher_name, lesson, age, isMarried)
      VALUES('sarvar', 'history', 34, true),
      ('laziz', 'biology', 26, false),
      ('jasur', 'maths', 29, false),
      ('mohir', 'physics', 30, true);

15. delete from teachers where teacher_id = 2;
16. drop table teachers;
17. DROP database schools;