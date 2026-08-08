USE qr_attendance_system;

-- ==========================================
-- Seed Users
-- ==========================================

SET @password = (SELECT password FROM users WHERE role = 'SUPER_ADMIN' LIMIT 1);

SELECT
    CASE
        WHEN @password IS NOT NULL THEN 'SUPER_ADMIN found'
        ELSE CAST('ERROR: SUPER_ADMIN user does not exist' AS UNSIGNED)
    END AS validation;


INSERT INTO users (first_name, last_name, email, password, role) VALUES
-- ('System', 'Administrator', 'admin@qrattendance.com', @password, 'SUPER_ADMIN'),
('John', 'Smith', 'john.smith@university.edu', @password, 'LECTURER'),
('Emily', 'Johnson', 'emily.johnson@university.edu', @password, 'LECTURER'),
('Michael', 'Brown', 'michael.brown@university.edu', @password, 'LECTURER'),
('Sarah', 'Wilson', 'sarah.wilson@university.edu', @password, 'LECTURER'),
('David', 'Taylor', 'david.taylor@university.edu', @password, 'LECTURER'),
('Jessica', 'Anderson', 'jessica.anderson@university.edu', @password, 'LECTURER'),

('Liam', 'Wilson', 'liam.wilson@student.edu', @password, 'STUDENT'),
('Olivia', 'Taylor', 'olivia.taylor@student.edu', @password, 'STUDENT'),
('Noah', 'Thomas', 'noah.thomas@student.edu', @password, 'STUDENT'),
('Emma', 'Moore', 'emma.moore@student.edu', @password, 'STUDENT'),
('William', 'Martin', 'william.martin@student.edu', @password, 'STUDENT'),
('Ava', 'Lee', 'ava.lee@student.edu', @password, 'STUDENT'),
('James', 'Walker', 'james.walker@student.edu', @password, 'STUDENT'),
('Sophia', 'Hall', 'sophia.hall@student.edu', @password, 'STUDENT'),
('Benjamin', 'Allen', 'benjamin.allen@student.edu', @password, 'STUDENT'),
('Mia', 'Young', 'mia.young@student.edu', @password, 'STUDENT'),
('Lucas', 'King', 'lucas.king@student.edu', @password, 'STUDENT');

-- ==========================================
-- Seed Courses
-- ==========================================

INSERT INTO courses (course_code, course_name, description, credits, session) VALUES
('CS101', 'Introduction to Programming', 'Programming fundamentals, algorithms and problem solving', 3, 'SPRING'),
('CS201', 'Database Systems', 'SQL, relational modelling, normalization and transactions', 3, 'AUTUMN'),
('CS220', 'Data Structures and Algorithms', 'Core data structures and algorithm analysis', 4, 'SPRING'),
('CS301', 'Software Engineering', 'Software design, development methodologies and testing', 3, 'AUTUMN'),
('CS310', 'Web Application Development', 'Frontend and backend web technologies', 3, 'SUMMER'),
('CS401', 'Artificial Intelligence', 'Machine learning and AI fundamentals', 4, 'WINTER');


-- ==========================================
-- Seed Course Lecturers
-- ==========================================

INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'john.smith@university.edu' WHERE c.course_code = 'CS101';
INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'emily.johnson@university.edu' WHERE c.course_code = 'CS201';
INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'michael.brown@university.edu' WHERE c.course_code = 'CS220';
INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'sarah.wilson@university.edu' WHERE c.course_code = 'CS301';
INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'david.taylor@university.edu' WHERE c.course_code = 'CS310';
INSERT INTO course_lecturers (course_id, user_id, role) SELECT c.id, u.id, 'PRIMARY' FROM courses c JOIN users u ON u.email = 'jessica.anderson@university.edu' WHERE c.course_code = 'CS401';



