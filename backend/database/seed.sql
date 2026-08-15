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
-- ('System', 'Administrator', 'admin@qrattendance.com', @password, 'super_admin'),
('John', 'Smith', 'john.smith@university.edu', @password, 'lecturer'),
('Emily', 'Johnson', 'emily.johnson@university.edu', @password, 'lecturer'),
('Michael', 'Brown', 'michael.brown@university.edu', @password, 'lecturer'),
('Sarah', 'Wilson', 'sarah.wilson@university.edu', @password, 'lecturer'),
('David', 'Taylor', 'david.taylor@university.edu', @password, 'lecturer'),
('Jessica', 'Anderson', 'jessica.anderson@university.edu', @password, 'lecturer'),

('Liam', 'Wilson', 'liam.wilson@student.edu', @password, 'student'),
('Olivia', 'Taylor', 'olivia.taylor@student.edu', @password, 'student'),
('Noah', 'Thomas', 'noah.thomas@student.edu', @password, 'student'),
('Emma', 'Moore', 'emma.moore@student.edu', @password, 'student'),
('William', 'Martin', 'william.martin@student.edu', @password, 'student'),
('Ava', 'Lee', 'ava.lee@student.edu', @password, 'student'),
('James', 'Walker', 'james.walker@student.edu', @password, 'student'),
('Sophia', 'Hall', 'sophia.hall@student.edu', @password, 'student'),
('Benjamin', 'Allen', 'benjamin.allen@student.edu', @password, 'student'),
('Mia', 'Young', 'mia.young@student.edu', @password, 'student'),
('Lucas', 'King', 'lucas.king@student.edu', @password, 'student');
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



