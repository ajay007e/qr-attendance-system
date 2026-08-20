-- ==========================================================
-- QR ATTENDANCE SYSTEM
-- COMPLETE SEED DATA
-- ==========================================================

USE qr_attendance_system;


-- ==========================================================
-- PASSWORD
-- ==========================================================

SET @password = (
    SELECT password
    FROM users
    WHERE role = 'super_admin'
    LIMIT 1
);


-- ==========================================================
-- 1. LECTURERS
-- ==========================================================

INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    role,
    is_active
) VALUES
('Daniel', 'Mitchell', 'daniel.mitchell@university.edu', @password, 'lecturer', TRUE),
('Sarah', 'Thompson', 'sarah.thompson@university.edu', @password, 'lecturer', TRUE),
('Michael', 'Anderson', 'michael.anderson@university.edu', @password, 'lecturer', TRUE),
('Emily', 'Roberts', 'emily.roberts@university.edu', @password, 'lecturer', TRUE),
('James', 'Campbell', 'james.campbell@university.edu', @password, 'lecturer', TRUE),
('Jessica', 'Morgan', 'jessica.morgan@university.edu', @password, 'lecturer', TRUE),
('Andrew', 'Richardson', 'andrew.richardson@university.edu', @password, 'lecturer', TRUE),
('Rachel', 'Turner', 'rachel.turner@university.edu', @password, 'lecturer', TRUE),
('Matthew', 'Phillips', 'matthew.phillips@university.edu', @password, 'lecturer', TRUE),
('Laura', 'Parker', 'laura.parker@university.edu', @password, 'lecturer', TRUE),
('Christopher', 'Evans', 'christopher.evans@university.edu', @password, 'lecturer', TRUE),
('Rebecca', 'Edwards', 'rebecca.edwards@university.edu', @password, 'lecturer', TRUE),
('Thomas', 'Collins', 'thomas.collins@university.edu', @password, 'lecturer', TRUE),
('Hannah', 'Stewart', 'hannah.stewart@university.edu', @password, 'lecturer', TRUE),
('William', 'Sanchez', 'william.sanchez@university.edu', @password, 'lecturer', TRUE),
('Sophie', 'Morris', 'sophie.morris@university.edu', @password, 'lecturer', TRUE),
('Benjamin', 'Rogers', 'benjamin.rogers@university.edu', @password, 'lecturer', TRUE),
('Olivia', 'Reed', 'olivia.reed@university.edu', @password, 'lecturer', TRUE),
('Alexander', 'Cook', 'alexander.cook@university.edu', @password, 'lecturer', TRUE),
('Charlotte', 'Bailey', 'charlotte.bailey@university.edu', @password, 'lecturer', TRUE),
('Jonathan', 'Cooper', 'jonathan.cooper@university.edu', @password, 'lecturer', TRUE),
('Grace', 'Richardson', 'grace.richardson@university.edu', @password, 'lecturer', TRUE),
('Nicholas', 'Cox', 'nicholas.cox@university.edu', @password, 'lecturer', TRUE),
('Amelia', 'Howard', 'amelia.howard@university.edu', @password, 'lecturer', TRUE),
('Samuel', 'Ward', 'samuel.ward@university.edu', @password, 'lecturer', TRUE),
('Megan', 'Brooks', 'megan.brooks@university.edu', @password, 'lecturer', TRUE),
('Ethan', 'Bennett', 'ethan.bennett@university.edu', @password, 'lecturer', TRUE),
('Victoria', 'Gray', 'victoria.gray@university.edu', @password, 'lecturer', TRUE),
('Henry', 'James', 'henry.james@university.edu', @password, 'lecturer', TRUE),
('Natalie', 'Foster', 'natalie.foster@university.edu', @password, 'lecturer', TRUE);


-- ==========================================================
-- 2. STUDENTS
-- ==========================================================

INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    role,
    is_active
) VALUES

('Liam', 'Wilson', 'liam.wilson@student.edu', @password, 'student', TRUE),
('Olivia', 'Taylor', 'olivia.taylor@student.edu', @password, 'student', TRUE),
('Noah', 'Thomas', 'noah.thomas@student.edu', @password, 'student', TRUE),
('Emma', 'Moore', 'emma.moore@student.edu', @password, 'student', TRUE),
('William', 'Martin', 'william.martin@student.edu', @password, 'student', TRUE),
('Ava', 'Lee', 'ava.lee@student.edu', @password, 'student', TRUE),
('James', 'Walker', 'james.walker@student.edu', @password, 'student', TRUE),
('Sophia', 'Hall', 'sophia.hall@student.edu', @password, 'student', TRUE),
('Benjamin', 'Allen', 'benjamin.allen@student.edu', @password, 'student', TRUE),
('Mia', 'Young', 'mia.young@student.edu', @password, 'student', TRUE),
('Lucas', 'King', 'lucas.king@student.edu', @password, 'student', TRUE),
('Charlotte', 'Wright', 'charlotte.wright@student.edu', @password, 'student', TRUE),
('Henry', 'Scott', 'henry.scott@student.edu', @password, 'student', TRUE),
('Amelia', 'Green', 'amelia.green@student.edu', @password, 'student', TRUE),
('Alexander', 'Baker', 'alexander.baker@student.edu', @password, 'student', TRUE),
('Harper', 'Adams', 'harper.adams@student.edu', @password, 'student', TRUE),
('Daniel', 'Nelson', 'daniel.nelson@student.edu', @password, 'student', TRUE),
('Evelyn', 'Carter', 'evelyn.carter@student.edu', @password, 'student', TRUE),
('Michael', 'Mitchell', 'michael.mitchell@student.edu', @password, 'student', TRUE),
('Ella', 'Perez', 'ella.perez@student.edu', @password, 'student', TRUE),
('Sebastian', 'Roberts', 'sebastian.roberts@student.edu', @password, 'student', TRUE),
('Camila', 'Turner', 'camila.turner@student.edu', @password, 'student', TRUE),
('Jack', 'Phillips', 'jack.phillips@student.edu', @password, 'student', TRUE),
('Luna', 'Campbell', 'luna.campbell@student.edu', @password, 'student', TRUE),
('Owen', 'Parker', 'owen.parker@student.edu', @password, 'student', TRUE),
('Aria', 'Evans', 'aria.evans@student.edu', @password, 'student', TRUE),
('Theodore', 'Edwards', 'theodore.edwards@student.edu', @password, 'student', TRUE),
('Scarlett', 'Collins', 'scarlett.collins@student.edu', @password, 'student', TRUE),
('Aiden', 'Stewart', 'aiden.stewart@student.edu', @password, 'student', TRUE),
('Victoria', 'Sanchez', 'victoria.sanchez@student.edu', @password, 'student', TRUE),
('Matthew', 'Morris', 'matthew.morris@student.edu', @password, 'student', TRUE),
('Nora', 'Rogers', 'nora.rogers@student.edu', @password, 'student', TRUE),
('Joseph', 'Reed', 'joseph.reed@student.edu', @password, 'student', TRUE),
('Layla', 'Cook', 'layla.cook@student.edu', @password, 'student', TRUE),
('David', 'Morgan', 'david.morgan@student.edu', @password, 'student', TRUE),
('Grace', 'Bell', 'grace.bell@student.edu', @password, 'student', TRUE),
('Wyatt', 'Murphy', 'wyatt.murphy@student.edu', @password, 'student', TRUE),
('Chloe', 'Bailey', 'chloe.bailey@student.edu', @password, 'student', TRUE),
('John', 'Rivera', 'john.rivera@student.edu', @password, 'student', TRUE),
('Penelope', 'Cooper', 'penelope.cooper@student.edu', @password, 'student', TRUE),
('Jack', 'Richardson', 'jack.richardson@student.edu', @password, 'student', TRUE),
('Riley', 'Cox', 'riley.cox@student.edu', @password, 'student', TRUE),
('Luke', 'Howard', 'luke.howard@student.edu', @password, 'student', TRUE),
('Zoey', 'Ward', 'zoey.ward@student.edu', @password, 'student', TRUE),
('Gabriel', 'Torres', 'gabriel.torres@student.edu', @password, 'student', TRUE),
('Mila', 'Peterson', 'mila.peterson@student.edu', @password, 'student', TRUE),
('Anthony', 'Gray', 'anthony.gray@student.edu', @password, 'student', TRUE),
('Lily', 'Ramirez', 'lily.ramirez@student.edu', @password, 'student', TRUE),
('Isaac', 'James', 'isaac.james@student.edu', @password, 'student', TRUE),
('Hannah', 'Watson', 'hannah.watson@student.edu', @password, 'student', TRUE),
('Dylan', 'Brooks', 'dylan.brooks@student.edu', @password, 'student', TRUE),
('Lillian', 'Kelly', 'lillian.kelly@student.edu', @password, 'student', TRUE),
('Thomas', 'Sanders', 'thomas.sanders@student.edu', @password, 'student', TRUE),
('Addison', 'Price', 'addison.price@student.edu', @password, 'student', TRUE),
('Caleb', 'Bennett', 'caleb.bennett@student.edu', @password, 'student', TRUE),
('Aubrey', 'Wood', 'aubrey.wood@student.edu', @password, 'student', TRUE),
('Nathan', 'Barnes', 'nathan.barnes@student.edu', @password, 'student', TRUE),
('Ellie', 'Ross', 'ellie.ross@student.edu', @password, 'student', TRUE),
('Ryan', 'Henderson', 'ryan.henderson@student.edu', @password, 'student', TRUE),
('Stella', 'Coleman', 'stella.coleman@student.edu', @password, 'student', TRUE),
('Adrian', 'Jenkins', 'adrian.jenkins@student.edu', @password, 'student', TRUE),
('Natalie', 'Perry', 'natalie.perry@student.edu', @password, 'student', TRUE),
('Christian', 'Powell', 'christian.powell@student.edu', @password, 'student', TRUE),
('Zoe', 'Long', 'zoe.long@student.edu', @password, 'student', TRUE),
('Aaron', 'Patterson', 'aaron.patterson@student.edu', @password, 'student', TRUE),
('Leah', 'Hughes', 'leah.hughes@student.edu', @password, 'student', TRUE),
('Eli', 'Flores', 'eli.flores@student.edu', @password, 'student', TRUE),
('Hazel', 'Washington', 'hazel.washington@student.edu', @password, 'student', TRUE),
('Lincoln', 'Butler', 'lincoln.butler@student.edu', @password, 'student', TRUE),
('Violet', 'Simmons', 'violet.simmons@student.edu', @password, 'student', TRUE),
('Jaxon', 'Foster', 'jaxon.foster@student.edu', @password, 'student', TRUE),
('Aurora', 'Gonzales', 'aurora.gonzales@student.edu', @password, 'student', TRUE),
('Dominic', 'Bryant', 'dominic.bryant@student.edu', @password, 'student', TRUE),
('Savannah', 'Alexander', 'savannah.alexander@student.edu', @password, 'student', TRUE),
('Charles', 'Russell', 'charles.russell@student.edu', @password, 'student', TRUE),
('Audrey', 'Griffin', 'audrey.griffin@student.edu', @password, 'student', TRUE),
('Ian', 'Diaz', 'ian.diaz@student.edu', @password, 'student', TRUE),
('Bella', 'Hayes', 'bella.hayes@student.edu', @password, 'student', TRUE),
('Jeremiah', 'Myers', 'jeremiah.myers@student.edu', @password, 'student', TRUE),
('Claire', 'Ford', 'claire.ford@student.edu', @password, 'student', TRUE),
('Thomas', 'Hamilton', 'thomas.hamilton@student.edu', @password, 'student', TRUE),
('Skylar', 'Graham', 'skylar.graham@student.edu', @password, 'student', TRUE),
('Hudson', 'Sullivan', 'hudson.sullivan@student.edu', @password, 'student', TRUE),
('Lucy', 'Wallace', 'lucy.wallace@student.edu', @password, 'student', TRUE),
('Cooper', 'Woods', 'cooper.woods@student.edu', @password, 'student', TRUE),
('Anna', 'Cole', 'anna.cole@student.edu', @password, 'student', TRUE),
('Ezra', 'West', 'ezra.west@student.edu', @password, 'student', TRUE),
('Caroline', 'Jordan', 'caroline.jordan@student.edu', @password, 'student', TRUE),
('Lincoln', 'Owens', 'lincoln.owens@student.edu', @password, 'student', TRUE),
('Maya', 'Reynolds', 'maya.reynolds@student.edu', @password, 'student', TRUE),
('Asher', 'Fisher', 'asher.fisher@student.edu', @password, 'student', TRUE),
('Madison', 'Ellis', 'madison.ellis@student.edu', @password, 'student', TRUE),
('Leo', 'Harrison', 'leo.harrison@student.edu', @password, 'student', TRUE),
('Ruby', 'Gibson', 'ruby.gibson@student.edu', @password, 'student', TRUE),
('James', 'Mcdonald', 'james.mcdonald@student.edu', @password, 'student', TRUE),
('Alice', 'Cruz', 'alice.cruz@student.edu', @password, 'student', TRUE),
('Mason', 'Marshall', 'mason.marshall@student.edu', @password, 'student', TRUE),
('Ivy', 'Ortiz', 'ivy.ortiz@student.edu', @password, 'student', TRUE),
('Ethan', 'Gomez', 'ethan.gomez@student.edu', @password, 'student', TRUE),
('Elena', 'Murray', 'elena.murray@student.edu', @password, 'student', TRUE),
('Logan', 'Freeman', 'logan.freeman@student.edu', @password, 'student', TRUE),
('Sophie', 'Wells', 'sophie.wells@student.edu', @password, 'student', TRUE),
('Jackson', 'Webb', 'jackson.webb@student.edu', @password, 'student', TRUE),
('Isla', 'Simpson', 'isla.simpson@student.edu', @password, 'student', TRUE),
('Mateo', 'Stevens', 'mateo.stevens@student.edu', @password, 'student', TRUE),
('Sadie', 'Tucker', 'sadie.tucker@student.edu', @password, 'student', TRUE),
('Sebastian', 'Porter', 'sebastian.porter@student.edu', @password, 'student', TRUE),
('Piper', 'Hunter', 'piper.hunter@student.edu', @password, 'student', TRUE),
('Carter', 'Hicks', 'carter.hicks@student.edu', @password, 'student', TRUE),
('Naomi', 'Crawford', 'naomi.crawford@student.edu', @password, 'student', TRUE),
('Julian', 'Henry', 'julian.henry@student.edu', @password, 'student', TRUE),
('Maya', 'Boyd', 'maya.boyd@student.edu', @password, 'student', TRUE),
('Grayson', 'Mason', 'grayson.mason@student.edu', @password, 'student', TRUE),
('Eliza', 'Morales', 'eliza.morales@student.edu', @password, 'student', TRUE),
('Nolan', 'Kennedy', 'nolan.kennedy@student.edu', @password, 'student', TRUE),
('Lydia', 'Warren', 'lydia.warren@student.edu', @password, 'student', TRUE),
('Lincoln', 'Dixon', 'lincoln.dixon@student.edu', @password, 'student', TRUE),
('Julia', 'Ramos', 'julia.ramos@student.edu', @password, 'student', TRUE),
('Miles', 'Reyes', 'miles.reyes@student.edu', @password, 'student', TRUE),
('Eva', 'Burns', 'eva.burns@student.edu', @password, 'student', TRUE),
('Hudson', 'Gordon', 'hudson.gordon@student.edu', @password, 'student', TRUE),
('Clara', 'Shaw', 'clara.shaw@student.edu', @password, 'student', TRUE),
('Lincoln', 'Holmes', 'lincoln.holmes@student.edu', @password, 'student', TRUE),
('Rose', 'Rice', 'rose.rice@student.edu', @password, 'student', TRUE),
('Connor', 'Robertson', 'connor.robertson@student.edu', @password, 'student', TRUE),
('Naomi', 'Hunt', 'naomi.hunt@student.edu', @password, 'student', TRUE),
('Adam', 'Black', 'adam.black@student.edu', @password, 'student', TRUE),
('Sarah', 'Daniels', 'sarah.daniels@student.edu', @password, 'student', TRUE),
('Cameron', 'Palmer', 'cameron.palmer@student.edu', @password, 'student', TRUE),
('Molly', 'Mills', 'molly.mills@student.edu', @password, 'student', TRUE),
('Nathaniel', 'Nichols', 'nathaniel.nichols@student.edu', @password, 'student', TRUE),
('Lucy', 'Grant', 'lucy.grant@student.edu', @password, 'student', TRUE),
('Robert', 'Knight', 'robert.knight@student.edu', @password, 'student', TRUE),
('Amy', 'Ferguson', 'amy.ferguson@student.edu', @password, 'student', TRUE),
('Isaiah', 'Rose', 'isaiah.rose@student.edu', @password, 'student', TRUE),
('Isabella', 'Stone', 'isabella.stone@student.edu', @password, 'student', TRUE),
('Colton', 'Hawkins', 'colton.hawkins@student.edu', @password, 'student', TRUE),
('Samantha', 'Dunn', 'samantha.dunn@student.edu', @password, 'student', TRUE),
('Maxwell', 'Perkins', 'maxwell.perkins@student.edu', @password, 'student', TRUE),
('Julia', 'Hudson', 'julia.hudson@student.edu', @password, 'student', TRUE),
('Christopher', 'Spencer', 'christopher.spencer@student.edu', @password, 'student', TRUE),
('Aaliyah', 'Gardner', 'aaliyah.gardner@student.edu', @password, 'student', TRUE),
('Joshua', 'Stephens', 'joshua.stephens@student.edu', @password, 'student', TRUE),
('Claire', 'Payne', 'claire.payne@student.edu', @password, 'student', TRUE),
('Andrew', 'Pierce', 'andrew.pierce@student.edu', @password, 'student', TRUE),
('Madeline', 'Berry', 'madeline.berry@student.edu', @password, 'student', TRUE),
('Nathan', 'Matthews', 'nathan.matthews@student.edu', @password, 'student', TRUE),
('Kayla', 'Arnold', 'kayla.arnold@student.edu', @password, 'student', TRUE),
('Aaron', 'Wagner', 'aaron.wagner@student.edu', @password, 'student', TRUE),
('Natalia', 'Willis', 'natalia.willis@student.edu', @password, 'student', TRUE),
('Evan', 'Ray', 'evan.ray@student.edu', @password, 'student', TRUE),
('Jasmine', 'Watkins', 'jasmine.watkins@student.edu', @password, 'student', TRUE),
('Brandon', 'Olson', 'brandon.olson@student.edu', @password, 'student', TRUE),
('Ariana', 'Carroll', 'ariana.carroll@student.edu', @password, 'student', TRUE),
('Zachary', 'Duncan', 'zachary.duncan@student.edu', @password, 'student', TRUE),
('Melanie', 'Snyder', 'melanie.snyder@student.edu', @password, 'student', TRUE),
('Jason', 'Hart', 'jason.hart@student.edu', @password, 'student', TRUE),
('Brianna', 'Cunningham', 'brianna.cunningham@student.edu', @password, 'student', TRUE),
('Tyler', 'Bradley', 'tyler.bradley@student.edu', @password, 'student', TRUE),
('Nicole', 'Lane', 'nicole.lane@student.edu', @password, 'student', TRUE),
('Kevin', 'Harper', 'kevin.harper@student.edu', @password, 'student', TRUE),
('Kaylee', 'Stone', 'kaylee.stone@student.edu', @password, 'student', TRUE),
('Justin', 'Mendoza', 'justin.mendoza@student.edu', @password, 'student', TRUE),
('Brooklyn', 'Parks', 'brooklyn.parks@student.edu', @password, 'student', TRUE),
('Brandon', 'McCarthy', 'brandon.mccarthy@student.edu', @password, 'student', TRUE),
('Hailey', 'Vaughn', 'hailey.vaughn@student.edu', @password, 'student', TRUE),
('Jordan', 'Chapman', 'jordan.chapman@student.edu', @password, 'student', TRUE),
('Lauren', 'Bishop', 'lauren.bishop@student.edu', @password, 'student', TRUE),
('Derek', 'Montgomery', 'derek.montgomery@student.edu', @password, 'student', TRUE),
('Katherine', 'Morrison', 'katherine.morrison@student.edu', @password, 'student', TRUE),
('Marcus', 'Franklin', 'marcus.franklin@student.edu', @password, 'student', TRUE),
('Sienna', 'Mcdowell', 'sienna.mcdowell@student.edu', @password, 'student', TRUE),
('Eric', 'Lynch', 'eric.lynch@student.edu', @password, 'student', TRUE),
('Rebecca', 'Wilkins', 'rebecca.wilkins@student.edu', @password, 'student', TRUE),
('Patrick', 'Cross', 'patrick.cross@student.edu', @password, 'student', TRUE),
('Alyssa', 'Fitzgerald', 'alyssa.fitzgerald@student.edu', @password, 'student', TRUE),
('Sean', 'Mccormick', 'sean.mccormick@student.edu', @password, 'student', TRUE),
('Morgan', 'Leach', 'morgan.leach@student.edu', @password, 'student', TRUE),
('Dylan', 'Murray', 'dylan.murray@student.edu', @password, 'student', TRUE),
('Rachel', 'Holt', 'rachel.holt@student.edu', @password, 'student', TRUE),
('Cody', 'Mayer', 'cody.mayer@student.edu', @password, 'student', TRUE),
('Erin', 'Keller', 'erin.keller@student.edu', @password, 'student', TRUE),
('Adam', 'Mann', 'adam.mann@student.edu', @password, 'student', TRUE),
('Brooke', 'Sampson', 'brooke.sampson@student.edu', @password, 'student', TRUE),
('Connor', 'Fleming', 'connor.fleming@student.edu', @password, 'student', TRUE),
('Mackenzie', 'Hines', 'mackenzie.hines@student.edu', @password, 'student', TRUE),
('Ryan', 'Davenport', 'ryan.davenport@student.edu', @password, 'student', TRUE),
('Kylie', 'Fowler', 'kylie.fowler@student.edu', @password, 'student', TRUE),
('Marcus', 'Wilcox', 'marcus.wilcox@student.edu', @password, 'student', TRUE),
('Jenna', 'Phelps', 'jenna.phelps@student.edu', @password, 'student', TRUE),
('Cameron', 'Bates', 'cameron.bates@student.edu', @password, 'student', TRUE),
('Tessa', 'Mack', 'tessa.mack@student.edu', @password, 'student', TRUE),
('Nathan', 'Moss', 'nathan.moss@student.edu', @password, 'student', TRUE),
('Paige', 'Higgins', 'paige.higgins@student.edu', @password, 'student', TRUE),
('Jordan', 'Knox', 'jordan.knox@student.edu', @password, 'student', TRUE),
('Kayla', 'Savage', 'kayla.savage@student.edu', @password, 'student', TRUE),
('Alex', 'Morrow', 'alex.morrow@student.edu', @password, 'student', TRUE),
('Madison', 'Sutton', 'madison.sutton@student.edu', @password, 'student', TRUE),
('Blake', 'Goodwin', 'blake.goodwin@student.edu', @password, 'student', TRUE),
('Avery', 'Mclean', 'avery.mclean@student.edu', @password, 'student', TRUE),
('Casey', 'Dawson', 'casey.dawson@student.edu', @password, 'student', TRUE),
('Taylor', 'Morrison', 'taylor.morrison@student.edu', @password, 'student', TRUE),
('Reese', 'Harding', 'reese.harding@student.edu', @password, 'student', TRUE),
('Carter', 'Atkinson', 'carter.atkinson@student.edu', @password, 'student', TRUE),
('Sydney', 'Baldwin', 'sydney.baldwin@student.edu', @password, 'student', TRUE),
('Peyton', 'Walsh', 'peyton.walsh@student.edu', @password, 'student', TRUE),
('Alexis', 'Donovan', 'alexis.donovan@student.edu', @password, 'student', TRUE),
('Jordan', 'Mckenzie', 'jordan.mckenzie@student.edu', @password, 'student', TRUE),
('Riley', 'Madden', 'riley.madden@student.edu', @password, 'student', TRUE),
('Emery', 'Finch', 'emery.finch@student.edu', @password, 'student', TRUE),
('Logan', 'Conway', 'logan.conway@student.edu', @password, 'student', TRUE),
('Parker', 'Caldwell', 'parker.caldwell@student.edu', @password, 'student', TRUE),
('Quinn', 'Sullivan', 'quinn.sullivan@student.edu', @password, 'student', TRUE),
('Morgan', 'Barrett', 'morgan.barrett@student.edu', @password, 'student', TRUE),
('Cameron', 'Dalton', 'cameron.dalton@student.edu', @password, 'student', TRUE),
('Jamie', 'Kendall', 'jamie.kendall@student.edu', @password, 'student', TRUE),
('Alexis', 'Monroe', 'alexis.monroe@student.edu', @password, 'student', TRUE),
('Drew', 'Holland', 'drew.holland@student.edu', @password, 'student', TRUE),
('Bailey', 'Frost', 'bailey.frost@student.edu', @password, 'student', TRUE),
('Finley', 'Harrison', 'finley.harrison@student.edu', @password, 'student', TRUE),
('Rowan', 'Baxter', 'rowan.baxter@student.edu', @password, 'student', TRUE),
('Blair', 'Mercer', 'blair.mercer@student.edu', @password, 'student', TRUE),
('Reagan', 'Morrison', 'reagan.morrison@student.edu', @password, 'student', TRUE),
('Dakota', 'Palmer', 'dakota.palmer@student.edu', @password, 'student', TRUE),
('Emerson', 'Holland', 'emerson.holland@student.edu', @password, 'student', TRUE),
('Skyler', 'Bennett', 'skyler.bennett@student.edu', @password, 'student', TRUE),
('Kendall', 'Browning', 'kendall.browning@student.edu', @password, 'student', TRUE),
('Hayden', 'Chambers', 'hayden.chambers@student.edu', @password, 'student', TRUE),
('Peyton', 'Mercer', 'peyton.mercer@student.edu', @password, 'student', TRUE),
('Marley', 'Norton', 'marley.norton@student.edu', @password, 'student', TRUE),
('Sage', 'Whitaker', 'sage.whitaker@student.edu', @password, 'student', TRUE),
('Charlie', 'Madden', 'charlie.madden@student.edu', @password, 'student', TRUE),
('Frankie', 'Benson', 'frankie.benson@student.edu', @password, 'student', TRUE),
('River', 'Hendricks', 'river.hendricks@student.edu', @password, 'student', TRUE),
('Micah', 'Sullivan', 'micah.sullivan@student.edu', @password, 'student', TRUE),
('Jules', 'Carter', 'jules.carter@student.edu', @password, 'student', TRUE);


-- ==========================================================
-- 3. TEST USERS
-- ==========================================================

INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    role,
    is_active
)
VALUES
(
    'Test',
    'Lecturer',
    'lecturer@test.com',
    @password,
    'lecturer',
    TRUE
),
(
    'Test',
    'Student',
    'student@test.com',
    @password,
    'student',
    TRUE
);


-- ==========================================================
-- 4. COURSES
-- ==========================================================

INSERT INTO courses (
    course_code,
    course_name,
    description,
    credits,
    is_active
) VALUES

('CS101', 'Introduction to Programming',
 'Fundamentals of programming, computational thinking, algorithms, variables, control structures, functions and basic software development.', 3, TRUE),

('CS102', 'Computer Systems Fundamentals',
 'Introduction to computer architecture, operating systems, binary representation, memory, processors and system software.', 3, TRUE),

('CS103', 'Discrete Mathematics',
 'Logic, sets, relations, functions, combinatorics, graphs and mathematical foundations for computer science.', 3, TRUE),

('CS104', 'Object-Oriented Programming',
 'Object-oriented programming principles including classes, inheritance, polymorphism, encapsulation and design patterns.', 3, TRUE),

('CS201', 'Database Management Systems',
 'Relational database design, SQL, normalization, transactions, indexing, constraints and database administration.', 3, TRUE),

('CS202', 'Computer Networks',
 'Network architectures, TCP/IP, routing, switching, network security, wireless communication and network administration.', 3, TRUE),

('CS203', 'Data Structures',
 'Arrays, linked lists, stacks, queues, trees, hash tables, heaps and efficient data organization.', 3, TRUE),

('CS204', 'Web Development',
 'Modern web development using HTML, CSS, JavaScript, REST APIs and server-side application development.', 3, TRUE),

('CS205', 'Software Testing',
 'Software quality assurance, unit testing, integration testing, system testing, automation and test-driven development.', 3, TRUE),

('CS206', 'Human Computer Interaction',
 'User interface design, usability engineering, accessibility, user research, prototyping and interaction design.', 3, TRUE),

('CS207', 'Operating Systems',
 'Processes, threads, scheduling, memory management, file systems, synchronization and operating system architecture.', 4, TRUE),

('CS208', 'Computer Security',
 'Cybersecurity principles, authentication, authorization, cryptography, vulnerabilities, secure software and network security.', 3, TRUE),

('CS301', 'Software Engineering',
 'Software development methodologies, requirements engineering, architecture, project management, version control and testing.', 3, TRUE),

('CS302', 'Algorithms and Complexity',
 'Algorithm design and analysis, sorting, searching, graph algorithms, dynamic programming and computational complexity.', 4, TRUE),

('CS303', 'Mobile Application Development',
 'Design and development of mobile applications, mobile interfaces, application architecture, APIs and deployment.', 3, TRUE),

('CS304', 'Cloud Computing',
 'Cloud architecture, virtualization, containers, distributed services, cloud storage and scalable application deployment.', 3, TRUE),

('CS305', 'Artificial Intelligence',
 'Artificial intelligence concepts including intelligent agents, search, reasoning, knowledge representation and machine learning.', 4, TRUE),

('CS306', 'Machine Learning',
 'Supervised and unsupervised learning, regression, classification, clustering, model evaluation and practical machine learning.', 4, TRUE),

('CS307', 'Data Analytics',
 'Data preparation, statistical analysis, visualization, exploratory analysis and data-driven decision making.', 3, TRUE),

('CS308', 'Information Systems',
 'Information systems architecture, enterprise systems, business processes, information management and digital transformation.', 3, TRUE),

('CS401', 'Advanced Software Architecture',
 'Advanced software architecture, distributed systems, architectural patterns, scalability, reliability and maintainability.', 4, TRUE),

('CS402', 'Cybersecurity Engineering',
 'Security engineering, threat modelling, secure architecture, penetration testing, incident response and security operations.', 4, TRUE),

('CS403', 'Distributed Systems',
 'Distributed computation, communication, consensus, replication, fault tolerance and distributed system architectures.', 4, TRUE),

('CS404', 'Final Year Computing Project',
 'Independent computing project involving requirements analysis, system design, implementation, testing, documentation and presentation.', 6, TRUE);


-- ==========================================================
-- 5. CURRENT COURSE OFFERINGS
-- ==========================================================
--
-- EXACTLY 16 CURRENT OFFERINGS:
--
-- 15 spring offerings:
--   CS101-CS104
--   CS201-CS208
--   CS301-CS303
--
-- 1 annual offering:
--   CS404
--
-- CS304-CS308 and CS401-CS403 are NOT currently offered.
--
-- session values are lowercase:
--   spring
--   annual
-- ==========================================================

INSERT INTO course_offerings (
    course_id,
    academic_year,
    session,
    start_date,
    end_date,
    status
)
SELECT
    c.id,

    2026,

    CASE
        WHEN c.course_code = 'CS404'
            THEN 'annual'
        ELSE 'spring'
    END,

    CASE
        WHEN c.course_code = 'CS404'
            THEN '2026-02-23'
        ELSE '2026-07-20'
    END,

    '2026-11-20',

    'enrol'

FROM courses c

WHERE c.course_code IN (
    'CS101',
    'CS102',
    'CS103',
    'CS104',
    'CS201',
    'CS202',
    'CS203',
    'CS204',
    'CS205',
    'CS206',
    'CS207',
    'CS208',
    'CS301',
    'CS302',
    'CS303',
    'CS404'
);


-- ==========================================================
-- 6. PRIMARY LECTURERS
-- ==========================================================
--
-- role = 'primary'
-- ==========================================================

INSERT INTO course_lecturers (
    course_offering_id,
    user_id,
    role
)
SELECT
    co.id,
    u.id,
    'primary'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

JOIN users u
    ON u.email = CASE c.course_code

        WHEN 'CS101' THEN 'daniel.mitchell@university.edu'
        WHEN 'CS102' THEN 'sarah.thompson@university.edu'
        WHEN 'CS103' THEN 'michael.anderson@university.edu'
        WHEN 'CS104' THEN 'emily.roberts@university.edu'
        WHEN 'CS201' THEN 'james.campbell@university.edu'
        WHEN 'CS202' THEN 'jessica.morgan@university.edu'
        WHEN 'CS203' THEN 'andrew.richardson@university.edu'
        WHEN 'CS204' THEN 'rachel.turner@university.edu'
        WHEN 'CS205' THEN 'matthew.phillips@university.edu'
        WHEN 'CS206' THEN 'laura.parker@university.edu'
        WHEN 'CS207' THEN 'christopher.evans@university.edu'
        WHEN 'CS208' THEN 'rebecca.edwards@university.edu'
        WHEN 'CS301' THEN 'thomas.collins@university.edu'
        WHEN 'CS302' THEN 'hannah.stewart@university.edu'
        WHEN 'CS303' THEN 'william.sanchez@university.edu'
        WHEN 'CS404' THEN 'amelia.howard@university.edu'

    END

WHERE co.academic_year = 2026
  AND co.session IN ('spring', 'annual');


-- ==========================================================
-- 7. SECONDARY LECTURERS
-- ==========================================================
--
-- role = 'secondary'
--
-- 10 spring offerings receive a secondary lecturer.
-- ==========================================================

INSERT INTO course_lecturers (
    course_offering_id,
    user_id,
    role
)
SELECT
    co.id,
    u.id,
    'secondary'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

JOIN users u
    ON u.email = CASE c.course_code

        WHEN 'CS101' THEN 'sarah.thompson@university.edu'
        WHEN 'CS102' THEN 'michael.anderson@university.edu'
        WHEN 'CS103' THEN 'emily.roberts@university.edu'
        WHEN 'CS104' THEN 'james.campbell@university.edu'
        WHEN 'CS201' THEN 'jessica.morgan@university.edu'
        WHEN 'CS202' THEN 'andrew.richardson@university.edu'
        WHEN 'CS203' THEN 'rachel.turner@university.edu'
        WHEN 'CS204' THEN 'matthew.phillips@university.edu'
        WHEN 'CS205' THEN 'laura.parker@university.edu'
        WHEN 'CS206' THEN 'christopher.evans@university.edu'

    END

WHERE co.academic_year = 2026
  AND co.session = 'spring'

  AND c.course_code IN (
      'CS101',
      'CS102',
      'CS103',
      'CS104',
      'CS201',
      'CS202',
      'CS203',
      'CS204',
      'CS205',
      'CS206'
  );


-- ==========================================================
-- 8. TUTORS
-- ==========================================================
--
-- role = 'tutor'
--
-- One tutor for every current offering.
-- ==========================================================

INSERT INTO course_lecturers (
    course_offering_id,
    user_id,
    role
)
SELECT
    co.id,
    u.id,
    'tutor'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

JOIN users u
    ON u.email = CASE c.course_code

        WHEN 'CS101' THEN 'nicholas.cox@university.edu'
        WHEN 'CS102' THEN 'amelia.howard@university.edu'
        WHEN 'CS103' THEN 'samuel.ward@university.edu'
        WHEN 'CS104' THEN 'megan.brooks@university.edu'
        WHEN 'CS201' THEN 'ethan.bennett@university.edu'
        WHEN 'CS202' THEN 'victoria.gray@university.edu'
        WHEN 'CS203' THEN 'henry.james@university.edu'
        WHEN 'CS204' THEN 'natalie.foster@university.edu'
        WHEN 'CS205' THEN 'daniel.mitchell@university.edu'
        WHEN 'CS206' THEN 'sarah.thompson@university.edu'
        WHEN 'CS207' THEN 'michael.anderson@university.edu'
        WHEN 'CS208' THEN 'emily.roberts@university.edu'
        WHEN 'CS301' THEN 'james.campbell@university.edu'
        WHEN 'CS302' THEN 'jessica.morgan@university.edu'
        WHEN 'CS303' THEN 'andrew.richardson@university.edu'
        WHEN 'CS404' THEN 'sophie.morris@university.edu'

    END

WHERE co.academic_year = 2026
  AND co.session IN ('spring', 'annual');


-- ==========================================================
-- 9. ADDITIONAL TUTORS
-- ==========================================================
--
-- role = 'tutor'
--
-- Six spring offerings receive a second tutor.
--
-- Total tutor assignments:
--   16 primary tutors
--   + 6 additional tutors
--   = 22 tutor assignments.
-- ==========================================================

INSERT INTO course_lecturers (
    course_offering_id,
    user_id,
    role
)
SELECT
    co.id,
    u.id,
    'tutor'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

JOIN users u
    ON u.email = CASE c.course_code

        WHEN 'CS101' THEN 'samuel.ward@university.edu'
        WHEN 'CS102' THEN 'megan.brooks@university.edu'
        WHEN 'CS103' THEN 'ethan.bennett@university.edu'
        WHEN 'CS104' THEN 'victoria.gray@university.edu'
        WHEN 'CS201' THEN 'henry.james@university.edu'
        WHEN 'CS202' THEN 'natalie.foster@university.edu'

    END

WHERE co.academic_year = 2026
  AND co.session = 'spring'

  AND c.course_code IN (
      'CS101',
      'CS102',
      'CS103',
      'CS104',
      'CS201',
      'CS202'
  );


-- ==========================================================
-- 10. CURRENT SECTION ENROLMENTS
-- ==========================================================
--
-- 16 current offerings
-- 24 students per offering
--
-- 16 * 24 = 384 enrolments.
--
-- 180 regular students are rotated through the 16 offerings.
-- Test student is excluded here.
-- ==========================================================

INSERT INTO course_enrolments (
    course_offering_id,
    user_id,
    status
)
WITH

offering_ranked AS (
    SELECT
        co.id AS offering_id,

        ROW_NUMBER() OVER (
            ORDER BY
                CASE
                    WHEN co.session = 'spring' THEN 1
                    ELSE 2
                END,
                co.id
        ) AS rn

    FROM course_offerings co

    WHERE co.academic_year = 2026
      AND co.session IN ('spring', 'annual')
      AND co.status = 'enrol'
),

student_ranked AS (
    SELECT
        u.id,

        ROW_NUMBER() OVER (
            ORDER BY u.id
        ) AS rn

    FROM users u

    WHERE u.role = 'student'
      AND u.is_active = TRUE
      AND u.email <> 'student@test.com'
),

slots AS (
    SELECT 1 AS slot
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 5
    UNION ALL SELECT 6
    UNION ALL SELECT 7
    UNION ALL SELECT 8
    UNION ALL SELECT 9
    UNION ALL SELECT 10
    UNION ALL SELECT 11
    UNION ALL SELECT 12
    UNION ALL SELECT 13
    UNION ALL SELECT 14
    UNION ALL SELECT 15
    UNION ALL SELECT 16
    UNION ALL SELECT 17
    UNION ALL SELECT 18
    UNION ALL SELECT 19
    UNION ALL SELECT 20
    UNION ALL SELECT 21
    UNION ALL SELECT 22
    UNION ALL SELECT 23
    UNION ALL SELECT 24
)

SELECT
    o.offering_id,
    s.id,
    'enrol'

FROM offering_ranked o

CROSS JOIN slots

JOIN student_ranked s
    ON s.rn =
       MOD(
           ((o.rn - 1) * 24)
           + (slots.slot - 1),
           180
       ) + 1;


-- ==========================================================
-- 11. TEST LECTURER ASSIGNMENTS
-- ==========================================================
--
-- Test lecturer:
--   lecturer@test.com
--
-- Assigned as 'secondary' to:
--   CS101 spring
--   CS201 spring
--   CS301 spring
--   CS404 annual
-- ==========================================================

INSERT INTO course_lecturers (
    course_offering_id,
    user_id,
    role
)
SELECT
    co.id,
    u.id,
    'secondary'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

CROSS JOIN users u

WHERE u.email = 'lecturer@test.com'

  AND (
      (
          c.course_code IN (
              'CS101',
              'CS201',
              'CS301'
          )
          AND co.session = 'spring'
      )
      OR
      (
          c.course_code = 'CS404'
          AND co.session = 'annual'
      )
  )

  AND co.academic_year = 2026;


-- ==========================================================
-- 12. TEST STUDENT ENROLMENT
-- ==========================================================
--
-- Test student:
--   student@test.com
--
-- Enrolled in:
--   CS101 spring
--   CS201 spring
--   CS301 spring
--   CS404 annual
-- ==========================================================

INSERT INTO course_enrolments (
    course_offering_id,
    user_id,
    status
)
SELECT
    co.id,
    u.id,
    'enrol'

FROM course_offerings co

JOIN courses c
    ON c.id = co.course_id

CROSS JOIN users u

WHERE u.email = 'student@test.com'

  AND (
      (
          c.course_code IN (
              'CS101',
              'CS201',
              'CS301'
          )
          AND co.session = 'spring'
      )
      OR
      (
          c.course_code = 'CS404'
          AND co.session = 'annual'
      )
  )

  AND co.academic_year = 2026;
