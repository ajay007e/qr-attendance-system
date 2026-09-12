-- ==========================================
-- QR Attendance Management System
-- Complete Database Schema
-- MySQL 8.x
-- ==========================================

CREATE DATABASE IF NOT EXISTS qr_attendance_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_course_name (course_name),
    INDEX idx_courses_active (is_active),
    CONSTRAINT chk_courses_credits CHECK (credits > 0)
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
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_course_offerings_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uq_course_offering UNIQUE (course_id, academic_year, session),
    CONSTRAINT chk_course_offering_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
    INDEX idx_course_offerings_year_session (academic_year, session),
    INDEX idx_course_offerings_status (status)
);


-- ==========================================
-- Course Lecturers
-- ==========================================

CREATE TABLE IF NOT EXISTS course_lecturers (
    course_offering_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'lecturer',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (course_offering_id, user_id),
    CONSTRAINT fk_course_lecturers_offering FOREIGN KEY (course_offering_id) REFERENCES course_offerings(id) ON DELETE CASCADE,
    CONSTRAINT fk_course_lecturers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_course_lecturers_user (user_id),
    INDEX idx_course_lecturers_role (role)
);


-- ==========================================
-- Course Enrolments
-- ==========================================

CREATE TABLE IF NOT EXISTS course_enrolments (
    course_offering_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (course_offering_id, user_id),
    CONSTRAINT fk_course_enrolments_offering FOREIGN KEY (course_offering_id) REFERENCES course_offerings(id) ON DELETE CASCADE,
    CONSTRAINT fk_course_enrolments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_course_enrolments_user (user_id),
    INDEX idx_course_enrolments_status (status)
);


-- ==========================================================
-- Attendance Sessions
-- ==========================================================

CREATE TABLE IF NOT EXISTS attendance_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    course_offering_id BIGINT UNSIGNED NOT NULL,
    lecturer_id BIGINT UNSIGNED NOT NULL,
    week_number TINYINT UNSIGNED NOT NULL,
    class_number TINYINT UNSIGNED NOT NULL,
    class_type VARCHAR(30) NOT NULL,
    session_start_at DATETIME NOT NULL,
    session_end_at DATETIME NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    session_status VARCHAR(30) NOT NULL DEFAULT 'open',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_sessions_course FOREIGN KEY (course_offering_id) REFERENCES course_offerings(id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_sessions_lecturer FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_session_times CHECK (session_end_at > session_start_at),
    CONSTRAINT chk_latitude_range CHECK (latitude BETWEEN -90 AND 90),
    CONSTRAINT chk_longitude_range CHECK (longitude BETWEEN -180 AND 180),
    INDEX idx_attendance_sessions_course (course_offering_id),
    INDEX idx_attendance_sessions_lecturer (lecturer_id),
    INDEX idx_attendance_sessions_status (session_status)
);

CREATE UNIQUE INDEX ux_attendance_sessions_one_open_per_course ON attendance_sessions ((CASE WHEN session_status = 'open' THEN course_offering_id END));


-- ==========================================
-- Attendance Records
-- ==========================================

CREATE TABLE IF NOT EXISTS attendance_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT UNSIGNED NOT NULL,
    student_id BIGINT UNSIGNED NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'present',
    attendance_method VARCHAR(30) NOT NULL,
    location_status VARCHAR(30) NOT NULL DEFAULT 'not_checked',
    marked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    marked_by BIGINT UNSIGNED NULL,
    lecturer_note VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_records_session FOREIGN KEY (session_id) REFERENCES attendance_sessions(id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_records_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_attendance_records_marked_by FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT uq_attendance_session_student UNIQUE (session_id, student_id),
    INDEX idx_attendance_records_student (student_id),
    INDEX idx_attendance_records_session (session_id),
    INDEX idx_attendance_records_student_status (student_id, status)
);


CREATE UNIQUE INDEX ux_attendance_sessions_course_week_class_type ON attendance_sessions (course_offering_id, week_number, class_number, class_type);
