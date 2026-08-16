## Import the Database Schema

The project includes the complete database schema in:

```text
backend/database/scripts.sql
```

Import the script using one of the following methods.

### Option 1 - MySQL Command Line

```bash
mysql -u <username> -p < backend/database/scripts.sql
```

Example:

```bash
mysql -u root -p < backend/database/scripts.sql
```

After entering your password, MySQL will execute the script and create the database objects defined in `scripts.sql`.

### Option 2 - MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Open `backend/database/scripts.sql`.
4. Execute the script.

## Populate the Database with Seed Data

The project also includes initial/sample data in:

```text
backend/database/seed.sql
```

Make sure the database schema has been imported before running the seed script.

### Option 1 - MySQL Command Line

```bash
mysql -u <username> -p qr_attendance_system < backend/database/seed.sql
```

Example:

```bash
mysql -u root -p qr_attendance_system < backend/database/seed.sql
```

### Option 2 - MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Select the database created from `scripts.sql`.
4. Open `backend/database/seed.sql`.
5. Execute the script.
6. Verify that the seed data has been inserted successfully.

> **Note:** Run `seed.sql` only after `scripts.sql` has been executed successfully, since the seed script expects the required tables and database objects to already exist.

## Verify the Installation

After importing the schema and seed data, connect to MySQL and verify that the database and tables have been created.

```sql
    SHOW DATABASES;
    USE <database_name>;
    SHOW TABLES;
```

You can also verify that the seed data was inserted by querying the relevant tables:

```sql
    SELECT * FROM <table_name>;
```

Replace `<table_name>` with one of the tables populated by `seed.sql`.

## Recommended Setup Order

1. Import `backend/database/scripts.sql` to create the database schema.
2. Import `backend/database/seed.sql` to populate the database with seed data.
3. Verify the database and tables using `SHOW DATABASES` and `SHOW TABLES`.
4. Verify that the seed data was inserted by querying the populated tables.
