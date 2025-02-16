DROP DATABASE IF EXISTS school;
CREATE DATABASE school;

\c school;

CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(30) NOT NULL,
    birth_year DATE
);

INSERT INTO students(student_name, birth_year) 
VALUES
('umid', '2000-08-12'),('umar', '2002-09-21'),
('komil', '2004-11-20'),('usmon', '2001-09-24'),
('anvar', '2003-12-23'),('ilyos', '2002-08-22');

1. CREATE FUNCTION calculate_age(birth_year DATE) 
RETURNS INT AS $$
BEGIN
    RETURN EXTRACT(YEAR FROM AGE(birth_year));
END;
$$ LANGUAGE plpgsql;

SELECT student_name, calculate_age(birth_year) AS age
FROM students;

2. CREATE TABLE courses(
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(30)
);

INSERT INTO courses(course_name)VALUES('nodejs'),('react'),('python'),('bootsrap'),('html & css');

CREATE TABLE enrollments(
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrollment_date DATE NOT NULL,
    CONSTRAINT student_fk FOREIGN KEY(student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT course_fk FOREIGN KEY(course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

CREATE OR REPLACE PROCEDURE enroll_students(courseId INT, studentList TEXT)
LANGUAGE plpgsql AS
$$
DECLARE
  studentId INT;
  done BOOLEAN DEFAULT FALSE;
  cur CURSOR FOR SELECT (jsonb_array_elements_text(studentList::jsonb))::INT;
BEGIN
 OPEN cur;
  LOOP
    FETCH cur INTO studentId;
    EXIT WHEN NOT FOUND;

    INSERT INTO enrollments(student_id, course_id, enrollment_date)
    VALUES (studentId, courseId, CURRENT_DATE);
  END LOOP;
  CLOSE cur;
END;
$$;

CALL enroll_students(2, '[1, 2, 3, 4]');
CALL enroll_students(1, '[5, 6]');

SELECT * FROM enrollments;


3. CREATE TABLE notifications(
  notification_id SERIAL PRIMARY KEY,
  student_id INT,
  message TEXT,
  created_at DATE,
  CONSTRAINT student_nk FOREIGN KEY(student_id) REFERENCES students(student_id) ON DELETE CASCADE
  );

ALTER TABLE students ADD COLUMN grades INTEGER;

INSERT INTO students(student_name, birth_year, grades) 
VALUES
('umid', '2000-08-12', 90),('umar', '2002-09-21', 75),
('komil', '2004-11-20', 85),('usmon', '2001-09-24', 80),
('anvar', '2003-12-23', 95),('ilyos', '2002-08-22', 100);

CREATE OR REPLACE FUNCTION grade_update_notification_func()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.grades < OLD.grades THEN
    INSERT INTO notifications(student_id, message, created_at)
    VALUES (NEW.student_id, 'Your grade has decreased to ' || NEW.grades, CURRENT_DATE);
END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER grade_update_notification
AFTER UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION grade_update_notification_func();

UPDATE students SET grades = 70 WHERE student_name = 'umid';
SELECT * FROM notifications;


4. CREATE TABLE student_grades(
  student_id INTEGER,
  course_id INTEGER,
  grades INTEGER,
    CONSTRAINT student_fg FOREIGN KEY(student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT course_fg FOREIGN KEY(course_id) REFERENCES courses(course_id) ON DELETE CASCADE
  );

INSERT INTO student_grades(student_id, course_id, grades)
 VALUES(2, 5, 90),(2, 3, 85),
       (2, 5, 95),(2, 5, 80),
       (3, 5, 90),(3, 1, 80),
      (3, 1, 85), (4, 3, 70),
       (4, 5, 75),(4, 3, 65);
 

CREATE OR REPLACE FUNCTION calc_avg_grade(student_id INTEGER, course_id INTEGER)
RETURNS FLOAT AS $$
DECLARE
  avg_grade FLOAT;
BEGIN
    SELECT AVG(grades) INTO avg_grade
    FROM student_grades
    WHERE student_grades.student_id = calc_avg_grade.student_id
    AND student_grades.course_id = calc_avg_grade.course_id;

    RETURN avg_grade;
END;
$$ LANGUAGE plpgsql;

SELECT student_id, course_id, calc_avg_grade(student_id, course_id) AS avg_grade
FROM student_grades
GROUP BY student_id, course_id;

5. CREATE OR REPLACE FUNCTION check_student_enrollment_func()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM enrollments 
    WHERE student_id = NEW.student_id 
      AND course_id = NEW.course_id
  ) THEN
    RAISE EXCEPTION 'Student % is already enrolled in course % and cannot enroll again.', NEW.student_id, NEW.course_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_student_enrollment
BEFORE INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION check_student_enrollment_func();

INSERT INTO enrollments(student_id, course_id, enrollment_date) 
VALUES (1, 5, CURRENT_DATE); 

INSERT INTO enrollments(student_id, course_id, enrollment_date) 
VALUES (1, 3, CURRENT_DATE);

INSERT INTO enrollments(student_id, course_id, enrollment_date) 
VALUES (1, 5, CURRENT_DATE);

//////////// Additional

CREATE OR REPLACE FUNCTION detect_best_student(courseId INTEGER)
RETURNS TABLE (student_name VARCHAR(30), grades INTEGER, enrollment_date DATE) AS $$
BEGIN
  RETURN QUERY 
  SELECT s.student_name, sg.grades, e.enrollment_date
  FROM student_grades sg
  JOIN students s ON sg.student_id = s.student_id
  JOIN enrollments e ON sg.student_id = e.student_id
  WHERE sg.course_id = courseId AND e.course_id = courseId
  ORDER BY sg.grades DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::VARCHAR(30), NULL::INTEGER, NULL::DATE;
  END IF;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM detect_best_student(5);

6. CREATE OR REPLACE FUNCTION calc_number_students(courseId INTEGER)
RETURNS INTEGER AS $$
DECLARE
  student_number INTEGER;
BEGIN 
  SELECT COUNT(*) INTO student_number FROM enrollments WHERE course_id = courseId;
  RETURN student_number;
END;
$$ LANGUAGE plpgsql;

SELECT calc_number_students(1);

7. CREATE OR REPLACE FUNCTION message_student()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (student_id, message, created_at)
  VALUES (NEW.student_id, 'Your registration process has been successfully completed', CURRENT_DATE);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER message_student_register
AFTER INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION message_student();

DELETE FROM enrollments WHERE student_id = 9 OR course_id = 3;
DELETE FROM enrollments WHERE student_id = 5 OR course_id = 4;

INSERT INTO enrollments(student_id, course_id, enrollment_date) 
VALUES (9, 3, CURRENT_DATE),(5, 4, CURRENT_DATE);

SELECT * FROM notifications;











