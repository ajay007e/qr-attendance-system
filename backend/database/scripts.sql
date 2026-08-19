-- ==========================================
-- QR Attendance Management System
-- Complete Database Schema
-- MySQL 8.x
-- ==========================================

CREATE DATABASE IF NOT EXISTS qr_attendance_system
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE qr_attendance_system;


-- ==========================================
-- Users
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) DEFAULT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    role VARCHAR(30) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active)
);


-- ==========================================
-- Courses
-- ==========================================

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(255) NOT NULL,

    description TEXT DEFAULT NULL,

    credits TINYINT UNSIGNED NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_course_name (course_name),
    INDEX idx_courses_active (is_active),

    CONSTRAINT chk_courses_credits
        CHECK (credits > 0)
);


-- ==========================================
-- Course Offerings
-- ==========================================

CREATE TABLE IF NOT EXISTS course_offerings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    course_id BIGINT UNSIGNED NOT NULL,

    academic_year YEAR NOT NULL,
    session VARCHAR(30) NOT NULL,

    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_course_offerings_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_course_offering
        UNIQUE (
            course_id,
            academic_year,
            session
        ),

    CONSTRAINT chk_course_offering_dates
        CHECK (
            end_date IS NULL
            OR start_date IS NULL
            OR end_date >= start_date
        ),

    INDEX idx_course_offerings_year_session (
        academic_year,
        session
    ),

    INDEX idx_course_offerings_status (
        status
    )
);


-- ==========================================
-- Course Lecturers
-- ==========================================

CREATE TABLE IF NOT EXISTS course_lecturers (
    course_offering_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    role VARCHAR(30) NOT NULL DEFAULT 'lecturer',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (
        course_offering_id,
        user_id
    ),

    CONSTRAINT fk_course_lecturers_offering
        FOREIGN KEY (course_offering_id)
        REFERENCES course_offerings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_lecturers_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_course_lecturers_user (
        user_id
    ),

    INDEX idx_course_lecturers_role (
        role
    )
);


-- ==========================================
-- Course Enrolments
-- ==========================================

CREATE TABLE IF NOT EXISTS course_enrolments (
    course_offering_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (
        course_offering_id,
        user_id
    ),

    CONSTRAINT fk_course_enrolments_offering
        FOREIGN KEY (course_offering_id)
        REFERENCES course_offerings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_enrolments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_course_enrolments_user (
        user_id
    ),

    INDEX idx_course_enrolments_status (
        status
    )
);


-- ==========================================
-- Attendance Sessions
-- One session represents one class/lecture
-- ==========================================

CREATE TABLE IF NOT EXISTS attendance_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    course_offering_id BIGINT UNSIGNED NOT NULL,

    session_date DATE NOT NULL,

    start_time TIME NOT NULL,
    end_time TIME DEFAULT NULL,

    qr_token VARCHAR(255) NOT NULL UNIQUE,

    qr_expires_at DATETIME DEFAULT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'open',

    created_by BIGINT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_sessions_offering
        FOREIGN KEY (course_offering_id)
        REFERENCES course_offerings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attendance_sessions_creator
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_attendance_session_times
        CHECK (
            end_time IS NULL
            OR end_time > start_time
        ),

    INDEX idx_attendance_sessions_offering (
        course_offering_id
    ),

    INDEX idx_attendance_sessions_date (
        session_date
    ),

    INDEX idx_attendance_sessions_status (
        status
    ),

    INDEX idx_attendance_sessions_creator (
        created_by
    ),

    INDEX idx_attendance_sessions_expiry (
        qr_expires_at
    )
);


-- ==========================================
-- Attendance Records
-- One record represents one student's
-- attendance for one attendance session
-- ==========================================

CREATE TABLE IF NOT EXISTS attendance_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    attendance_session_id BIGINT UNSIGNED NOT NULL,

    student_id BIGINT UNSIGNED NOT NULL,

    attendance_status VARCHAR(30) NOT NULL DEFAULT 'present',

    marked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    marked_by VARCHAR(30) NOT NULL DEFAULT 'qr',

    remarks VARCHAR(500) DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_records_session
        FOREIGN KEY (attendance_session_id)
        REFERENCES attendance_sessions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attendance_records_student
        FOREIGN KEY (student_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    -- A student can only have one attendance record
    -- for a particular attendance session.
    CONSTRAINT uq_attendance_session_student
        UNIQUE (
            attendance_session_id,
            student_id
        ),

    INDEX idx_attendance_records_student (
        student_id
    ),

    INDEX idx_attendance_records_status (
        attendance_status
    ),

    INDEX idx_attendance_records_marked_at (
        marked_at
    ),

    INDEX idx_attendance_records_student_status (
        student_id,
        attendance_status
    )
);


-- ==========================================
-- Optional:
-- Prevent duplicate attendance sessions
-- for the same course/date/start time
-- ==========================================

CREATE INDEX idx_attendance_sessions_course_date
    ON attendance_sessions (
        course_offering_id,
        session_date,
        start_time
    );
