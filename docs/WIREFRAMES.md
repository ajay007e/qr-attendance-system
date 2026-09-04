Create a low-fidelity desktop web application wireframe for a university lecturer attendance management page.

Context:
The lecturer has NO active attendance session for the selected course.

Page layout:

1. Top navigation

- University logo on the left
- Course name / course code
- Lecturer profile on the right
- Keep the navigation simple and clean

2. Page header

- Title: "Attendance"
- Course name and course code below the title
- A prominent primary button on the right:
  "Start Attendance"

3. Tabs
   Create two tabs:

- Sessions
- Attendance

The "Sessions" tab should be selected by default.

4. Sessions tab
   Show a table containing previous attendance sessions.

Table columns:

- Week
- Class Type
- Start Time
- End Time
- Status
- Actions

Example rows:

- Week 1 | Lecture | 09:00 | 10:00 | Closed | View
- Week 2 | Tutorial | 11:00 | 12:00 | Closed | View
- Week 3 | Laboratory | 14:00 | 16:00 | Expired | View

Actions can include:

- View
- Reopen

5. Attendance tab
   Show a course-level attendance summary table.

Columns:

- Student
- Student ID
- Total Sessions
- Present
- Absent
- Attendance Percentage

6. Empty/current-state indication
   Clearly communicate that there is currently no active attendance session.

Example message:
"No active attendance session"

7. Design requirements

- Low-fidelity wireframe
- Desktop layout
- Clean university administration dashboard
- Use grayscale/neutral colors
- Clear hierarchy
- Tables should be the main content
- Do not include QR code
- Do not include live attendance
- Do not include manual attendance controls

---

Create a low-fidelity desktop web application wireframe for a university lecturer attendance management page.

Context:
The lecturer is viewing a course where the current attendance session is CLOSED.
The lecturer should be able to reopen the session.

Page layout:

1. Top navigation

- University logo
- Course name / course code
- Lecturer profile

2. Page header

- Title: "Attendance"
- Course name and course code
- Prominent primary button:
  "Reopen Attendance"

3. Current session status card
   Show a small session summary card near the top.

Information:

- Week: 5
- Class Type: Lecture
- Start Time: 09:00
- End Time: 10:00
- Status: Closed

Show the status clearly as "Closed".

4. Tabs
   Create two tabs:

- Sessions
- Attendance

The "Sessions" tab should be selected.

5. Sessions tab
   Show a table of attendance sessions.

Columns:

- Week
- Class Type
- Start Time
- End Time
- Status
- Actions

Example:

- Week 5 | Lecture | 09:00 | 10:00 | Closed | Reopen
- Week 4 | Tutorial | 11:00 | 12:00 | Expired | View
- Week 3 | Lecture | 09:00 | 10:00 | Closed | View

The current closed session should be visually highlighted.

6. Attendance tab
   Show a course attendance summary table.

Columns:

- Student
- Student ID
- Total Sessions
- Present
- Absent
- Attendance Percentage

7. Design requirements

- Low-fidelity desktop wireframe
- University administration dashboard
- Neutral grayscale colors
- Clear distinction between Closed and Expired
- Reopen Attendance should be the main action
- Do not include QR code
- Do not include live attendance
- Do not include manual attendance controls

---

Create a low-fidelity desktop web application wireframe for a university lecturer attendance management dashboard.

Context:
The lecturer currently has an OPEN/ACTIVE attendance session for the selected course.

The lecturer needs to monitor live attendance and manually mark attendance.

Page layout:

1. Top navigation

- University logo
- Course name / course code
- Lecturer profile

2. Page header

- Title: "Attendance"
- Course name and course code
- Session status badge: "Open"
- Secondary action: "Close Attendance"
- Primary action: "Manual Attendance"

3. Active session summary
   Create a session information card.

Display:

- Week: 5
- Class Type: Lecture
- Start Time: 09:00
- End Time: 10:00
- Status: Open
- Remaining time / session time indicator

4. Live attendance summary

Create summary cards:

- Total Students
- Present
- Not Yet Marked
- Attendance Percentage

Example:
Total Students: 80
Present: 65
Not Yet Marked: 15
Attendance: 81%

5. Tabs

Create two tabs:

- Sessions
- Attendance

The "Attendance" tab should be selected by default because the session is active.

6. Attendance tab

Show a live student attendance table.

Columns:

- Student
- Student ID
- Attendance Status
- Marked At
- Action

Example rows:

- John Smith | 10001 | Present | 09:12 | —
- Sarah Lee | 10002 | Not Marked | — | Mark Present
- David Brown | 10003 | Present | 09:15 | —

The table should visually distinguish:

- Present
- Not Marked

7. Manual attendance

Include a prominent "Manual Attendance" button.

When clicked, it should allow the lecturer to select a student and manually mark attendance.

8. Sessions tab

When the lecturer switches to Sessions, show:

Columns:

- Week
- Class Type
- Start Time
- End Time
- Status
- Actions

The current session should be highlighted and marked as Open.

9. Live updates

Clearly communicate that the attendance table is updated in real time.

Example indicator:
"Live attendance"

Use a small live/status indicator.

10. Design requirements

- Low-fidelity desktop wireframe
- University administration dashboard
- Clean and functional
- Prioritize live attendance visibility
- Tables should be the main content
- Use neutral grayscale colors with minimal status colors
- Include "Manual Attendance"
- Include "Close Attendance"
- Do not add unnecessary student-facing features

---

Create a low-fidelity desktop web application wireframe for a university student attendance page.

Context:
The student wants to view their attendance statistics and previous attendance history for a course.

The student does NOT need lecturer session management controls.

Page layout:

1. Top navigation

Include:

- University logo
- Navigation links
- Course navigation
- Attendance QR scanner icon/button
- Notifications icon
- Student profile

2. Page header

Title:
"Attendance"

Show:

- Course name
- Course code

3. Attendance statistics

Create a statistics section at the top.

Show summary cards:

- Total Sessions
- Attended
- Missed
- Attendance Percentage

Example:
Total Sessions: 20
Attended: 17
Missed: 3
Attendance: 85%

4. Attendance overview

Create a simple attendance summary section.

Possible visualization:

- Large attendance percentage
- Progress bar
- Present vs missed summary

Keep it simple and suitable for a university student dashboard.

5. Attendance history

Create a section titled:

"Attendance History"

Include a filter control:

"Class Type"

Dropdown options:

- All
- Lecture
- Laboratory
- Tutorial
- Workshop
- Seminar
- Other

The history table should be filterable by class type.

6. Attendance history table

Columns:

- Week
- Date
- Class Type
- Start Time
- End Time
- Status

Example rows:

Week 1 | 2026-08-01 | Lecture | 09:00 | 10:00 | Present
Week 2 | 2026-08-08 | Tutorial | 11:00 | 12:00 | Present
Week 3 | 2026-08-15 | Laboratory | 14:00 | 16:00 | Absent

7. Infinite scrolling

The attendance history should use infinite scrolling instead of traditional pagination.

Show a loading indicator at the bottom of the table when more records are being loaded.

Example:
"Loading more attendance records..."

8. Empty state

If there are no attendance records matching the selected class type:

"No attendance records found."

9. Design requirements

- Low-fidelity desktop wireframe
- Student-facing university dashboard
- Clean and simple UI
- Statistics should be visible immediately
- Attendance history should be the main content
- Class Type should be the only filter
- Infinite scrolling instead of pagination
- Include QR scanner in the top navigation
- Include notification icon
- Do not include lecturer controls
- Do not include manual attendance controls
- Do not include session management controls
