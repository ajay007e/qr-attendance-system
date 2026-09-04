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

    -- Academic week supplied when the session is created.
    week_number SMALLINT UNSIGNED NOT NULL,

    -- Type of class this session represents.
    class_type ENUM(
        'LECTURE',
        'LABORATORY',
        'TUTORIAL',
        'WORKSHOP',
        'SEMINAR',
        'OTHER'
    ) NOT NULL,

    -- The actual time window of the class/session.
    session_start_at TIMESTAMP NOT NULL,
    session_end_at TIMESTAMP NOT NULL,

    -- Whether students can currently record attendance.
    attendance_status ENUM(
        'OPEN',
        'CLOSED'
    ) NOT NULL DEFAULT 'CLOSED',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_sessions_offering
        FOREIGN KEY (course_offering_id)
        REFERENCES course_offerings(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_attendance_sessions_week
        CHECK (week_number > 0),

    CONSTRAINT chk_attendance_sessions_time
        CHECK (session_end_at > session_start_at),

    INDEX idx_attendance_sessions_offering_week (
        course_offering_id,
        week_number
    ),

    INDEX idx_attendance_sessions_offering_start (
        course_offering_id,
        session_start_at
    ),

    INDEX idx_attendance_sessions_offering_status (
        course_offering_id,
        attendance_status
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

    student_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'PRESENT',
        'ABSENT',
        'EXCUSED'
    ) NOT NULL DEFAULT 'PRESENT',

    attendance_method ENUM(
        'QR',
        'MANUAL'
    ) NOT NULL,

    location_status ENUM(
        'VERIFIED',
        'SUSPICIOUS',
        'NOT_CHECKED'
    ) NOT NULL DEFAULT 'NOT_CHECKED',

    marked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- NULL when attendance was recorded automatically via QR.
    -- Contains the lecturer's user ID when manually recorded/changed.
    marked_by BIGINT UNSIGNED NULL,

    lecturer_note VARCHAR(500) DEFAULT NULL,

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

    CONSTRAINT fk_attendance_records_marked_by
        FOREIGN KEY (marked_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    -- A student can only have one attendance record per session.
    CONSTRAINT uq_attendance_session_student
        UNIQUE (
            attendance_session_id,
            student_id
        ),

    INDEX idx_attendance_records_student (
        student_id
    ),

    INDEX idx_attendance_records_session (
        attendance_session_id
    ),

    INDEX idx_attendance_records_student_status (
        student_id,
        status
    )
);
