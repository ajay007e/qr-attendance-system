-- ==========================================
-- Course Enrolments
-- ==========================================

CREATE TABLE IF NOT EXISTS course_enrolments (
    course_offering_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'ENROLLED',
        'DROPPED',
        'COMPLETED',
        'WITHDRAWN'
    ) NOT NULL DEFAULT 'ENROLLED',

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
        ON DELETE CASCADE,

    INDEX idx_course_enrolments_user (
        user_id
    ),

    INDEX idx_course_enrolments_status (
        status
    )
);


-- ==========================================
-- Attendance Sessions
-- ==========================================
-- Represents one actual attendance/class
-- session.
--
-- Example:
--
-- CS101
-- 2026 SPRING
-- 17 August 2026
-- 10:00 - 12:00
--
-- A QR code can be generated for this session.
-- ==========================================

CREATE TABLE IF NOT EXISTS attendance_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    course_offering_id BIGINT UNSIGNED NOT NULL,

    title VARCHAR(255) DEFAULT NULL,

    session_date DATE NOT NULL,

    start_time TIME NOT NULL,
    end_time TIME DEFAULT NULL,

    qr_token VARCHAR(255) DEFAULT NULL,

    qr_generated_at TIMESTAMP NULL DEFAULT NULL,
    qr_expires_at TIMESTAMP NULL DEFAULT NULL,

    status ENUM(
        'SCHEDULED',
        'OPEN',
        'CLOSED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'SCHEDULED',

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

    UNIQUE KEY uq_attendance_qr_token (
        qr_token
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

    INDEX idx_attendance_sessions_offering_date (
        course_offering_id,
        session_date
    )
);


-- ==========================================
-- Attendance Records
-- ==========================================
-- Represents a student's attendance for
-- one attendance session.
--
-- Example:
--
-- Session #10
--     Alice -> PRESENT
--     Bob   -> LATE
--     John  -> EXCUSED
--
-- UNIQUE(session, user) prevents a student
-- from creating duplicate attendance records.
-- ==========================================

CREATE TABLE IF NOT EXISTS attendance_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    attendance_session_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'PRESENT',
        'LATE',
        'ABSENT',
        'EXCUSED'
    ) NOT NULL DEFAULT 'PRESENT',

    check_in_at TIMESTAMP NULL DEFAULT NULL,
    check_out_at TIMESTAMP NULL DEFAULT NULL,

    method ENUM(
        'QR',
        'MANUAL'
    ) NOT NULL DEFAULT 'QR',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_records_session
        FOREIGN KEY (attendance_session_id)
        REFERENCES attendance_sessions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attendance_records_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE KEY uq_attendance_session_user (
        attendance_session_id,
        user_id
    ),

    INDEX idx_attendance_records_user (
        user_id
    ),

    INDEX idx_attendance_records_status (
        status
    ),

    INDEX idx_attendance_records_check_in (
        check_in_at
    )
);
