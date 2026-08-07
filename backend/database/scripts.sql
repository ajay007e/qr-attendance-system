-- ==========================================
-- Attendance Management System
-- Database Schema
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

    -- uuid CHAR(36) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) DEFAULT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    role VARCHAR(30) NOT NULL,

    -- phone VARCHAR(20) DEFAULT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    -- last_login_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active)
);

-- ==========================================================
-- Courses
-- ==========================================================

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(255) NOT NULL,

    description TEXT DEFAULT NULL,

    credits TINYINT UNSIGNED NOT NULL,

    session ENUM(
        'ANNUAL',
        'SPRING',
        'SUMMER',
        'AUTUMN',
        'WINTER',
        'TRIMESTER_1',
        'TRIMESTER_2',
        'TRIMESTER_3'
    ) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_course_code (course_code),
    INDEX idx_course_name (course_name),
    INDEX idx_session (session),
    INDEX idx_active (is_active)
);

-- ==========================================================
-- Course Lecturers
-- ==========================================================

CREATE TABLE IF NOT EXISTS course_lecturers (
    course_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    role ENUM(
        'PRIMARY',
        'SECONDARY',
        'TUTOR'
    ) NOT NULL DEFAULT 'PRIMARY',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (course_id, user_id),

    CONSTRAINT fk_course_lecturers_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_lecturers_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_course_lecturers_user (user_id),
    INDEX idx_course_lecturers_role (role),
    INDEX idx_course_lecturers_course_role (course_id, role)
);

-- ==========================================================
-- Course Enrolments
-- ==========================================================

CREATE TABLE IF NOT EXISTS course_enrolments (
    course_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (course_id, user_id),

    CONSTRAINT fk_course_enrolments_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_enrolments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_course_enrolments_user (user_id)
);
