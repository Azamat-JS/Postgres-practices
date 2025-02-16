CREATE EXTENSION IF NOT EXISTS pgcrypto;

0. create database StudentManagementSystem;
0. create table students(
    student_id serial primary key,
    student_name VARCHAR(40) NOT NULL,
    birth_date integer NOT NULL,
    grades integer NOT NULL,
    hometown VARCHAR(30),
    age integer not null,
    course VARCHAR(30)
);

0. insert into students(student_name, birth_date, age, grades, hometown, course)
   VALUES('Zokir', 2000, 25, 80, 'Urgench', 'English'),
        ('Nodir', 2002, 23, 90, 'Tashkent', 'IT'),
        ('Olim', 2004, 21, 85, 'Buxoro', 'History'),
        ('Botir', 1997, 28, 95, 'Nukus', 'IT'),
        ('Temur', 2003, 22, 100, 'Navoi', 'English'),
        ('Olim', 1999, 26, 70, 'Termiz', 'IT'),
        ('Komil', 2000, 25, 80, 'Andijon', 'English'),
        ('Zokir', 2003, 22, 80, 'Tashkent', 'IT'),
        ('Komil', 2005, 20, 100, 'Urgench', 'Maths'),
        ('Olim', 1998, 27, 85, 'Tashkent', 'IT'),
        ('Ilyos', 1999, 26, 95, 'Urgench', 'English'),
        ('Temur', 2000, 25, 90, 'Samarqand', 'IT'),
        ('Ilyos', 2002, 23, 75, 'Buxoro', 'Maths'),
        ('Zokir', 1998, 27, 90, 'Samarqand', 'IT'),
        ('Temur', 2004, 21, 85, 'Andijon','IT'),
        ('Nodir', 2002, 23, 90, 'Tashkent', 'English'),
        ('Olim', 2004, 21, 85, 'Buxoro','IT'),
        ('Botir', 1997, 28, 95, 'Nukus', 'Maths'),
        ('Temur', 2003, 22, 100, 'Navoi', 'IT'),
        ('Olim', 1999, 26, 70, 'Termiz', 'History'),
        ('Komil', 2000, 25, 80, 'Andijon', 'English'),
        ('Zokir', 2003, 22, 80, 'Tashkent','English'),
        ('Komil', 2005, 20, 100, 'Urgench','IT'),
        ('Olim', 1998, 27, 85, 'Tashkent','IT'),
        ('Ilyos', 1999, 26, 95, 'Urgench', 'History'),
        ('Temur', 2000, 25, 90, 'Samarqand', 'English'),
        ('Ilyos', 2002, 23, 75, 'Buxoro','IT'),
        ('Zokir', 1998, 27, 90, 'Samarqand','English'),
        ('Temur', 2004, 21, 85, 'Andijon', 'History');

1. create index idx_id ON students(student_id);
1. select * from students where student_id = 4;
1. create index idx_name_age ON students(student_name, age);
1. select * from students where student_name = 'Temur' and age=25;
1. create index idx_capital ON students(hometown) where hometown = 'Tashkent';
1. select * from students where hometown = 'Tashkent';

2. select student_name, grades from students order by grades asc;
2. select student_name, grades from students order by grades desc;

3. select * from students offset 5 limit 10;

4. select hometown, count(*) from students group by hometown;

5. SELECT AVG(age) AS avg_age FROM students;

6. select student_name from students where course = 'IT'
   Union
   select student_name from students where course = 'English';
   
7. select course, AVG(grades) AS avg_grades from students group by course Having AVG(grades) > 80;

8. SELECT course, SUM(grades) as total_grades
 FROM students
 GROUP BY course
 HAVING SUM(grades) > 0;

9. select student_name, grades, hometown from students where (grades between 70 and 90) or hometown = 'Tashkent';

10. select student_name from students where student_name Like '%r';
10. select student_name from students where student_name Like '%l%';
10. select student_name from students where student_name ILike 'n%';


////// Additional tasks 

0. create table teachers(
    teacher_id serial primary key,
    teacher_name VARCHAR(40) NOT NULL,
    birth_date integer NOT NULL,
    course VARCHAR(40) NOT NULL,
    hometown VARCHAR(30)
);

insert into teachers(teacher_name, birth_date, hometown, course)
   VALUES('Zokir', 1995, 'Urgench', 'English'),
        ('Nodir', 1992, 'Tashkent', 'IT'),
        ('Olim', 1994, 'Buxoro', 'History'),
        ('Botir', 1997, 'Nukus', 'IT'),
        ('Temur', 1993, 'Navoi', 'English'),
        ('Olim', 1999, 'Termiz', 'IT'),
        ('Komil', 1996, 'Andijon', 'English'),
        ('Zokir', 1994,  'Tashkent', 'IT'),
        ('Komil', 1995,  'Urgench', 'Maths'),
        ('Olim', 1998, 'Tashkent', 'IT'),
        ('Ilyos', 1999,  'Urgench', 'English'),
        ('Nodir', 1992, 'Tashkent', 'IT'),
        ('Olim', 1994, 'Buxoro', 'History'),
        ('Botir', 1997, 'Nukus', 'IT'),
        ('Temur', 1993, 'Navoi', 'English'),
        ('Olim', 1999, 'Termiz', 'IT'),
        ('Komil', 1996, 'Andijon', 'English'),
        ('Komil', 1995,  'Urgench', 'Maths'),
        ('Olim', 1998, 'Tashkent', 'IT'),
        ('Ilyos', 1999,  'Urgench', 'English'),
        ('Nodir', 1992, 'Tashkent', 'IT'),
        ('Olim', 1994, 'Buxoro', 'History'),
        ('Botir', 1997, 'Nukus', 'IT'),
        ('Temur', 1993, 'Navoi', 'English'),
        ('Olim', 1999, 'Termiz', 'IT'),
        ('Komil', 1996, 'Andijon', 'English'),
        ('Zokir', 1994,  'Tashkent', 'IT'),
        ('Komil', 1995,  'Urgench', 'Maths'),
        ('Olim', 1998, 'Tashkent', 'IT'),
        ('Ilyos', 1999,  'Urgench', 'English');

1. create index ind_id ON teachers(teacher_id);

2. select student_name, grades, course from students order by grades, course asc limit 10;

3. select course, AVG(grades) AS avg_grades from students group by course Having AVG(grades) > 85;

5. select student_name, course, birth_date, hometown from students where (age between 18 and 25) or hometown in ('Tashkent', 'Urgench');

6. select student_name from students where student_name Like '%s';
6. select teacher_name from teachers where teacher_name ILike 'z%';

7. select * from teachers offset 20 limit 10;