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

Example

```bash
mysql -u root -p < backend/database/scripts.sql
```

After entering your password, MySQL will execute the script and create the database objects defined in `scripts.sql`.

### Option 2 - MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Open `backend/database/scripts.sql`.
4. Execute the script.

## Verify the Installation

After importing the script, connect to MySQL and verify that the database and tables have been created.

```sql
SHOW DATABASES;

USE <database_name>;

SHOW TABLES;
```
