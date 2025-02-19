create table student (
    id serial primary key,
    name varchar(128),
    email varchar(128) unique
);

create table course(
    id serial primary key,
    title varchar(128) unique
);

create table member (
    student_id integer references student(id) on delete cascade,
    course_id integer references course(id) on delete cascade,
    role integer,
    primary key (student_id, course_id)
);

insert into student(name, email) values ('andrew', 'andrew@com');
insert into student(name, email) values ('jack', 'jack@com');
insert into student(name, email) values ('bob', 'bob@com');

insert into course(title) values('python');
insert into course(title) values('java');
insert into course(title) values('flutter');

insert into member(student_id, course_id, role) values(1, 1, 1);
insert into member(student_id, course_id, role) values(2, 1, 0);
insert into member(student_id, course_id, role) values(3, 1, 0);
insert into member(student_id, course_id, role) values(1, 2, 0);
insert into member(student_id, course_id, role) values(2, 2, 1);
insert into member(student_id, course_id, role) values(2, 3, 1);
insert into member(student_id, course_id, role) values(3, 3, 0);

select student.name, member.role, course.title
from student 
join member on member.student_id = student.id
join course on member.course_id = course.id
order by course.title, member.role desc, student.name;
