# MySQL with Docker

This guide explains how to set up a local MySQL instance using Docker for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker Desktop (Windows/macOS)
- Docker Engine with Docker Compose (Linux)

Verify your installation:

```bash
docker --version
docker compose version
```

## Start MySQL

From the project root, run:

```bash
docker compose up -d
```

This will:

- Pull the MySQL image (first run only)
- Create a MySQL container
- Create a persistent Docker volume
- Expose MySQL on port **3306**

Verify that the container is running:

```bash
docker ps
```

Expected output:

```text
CONTAINER ID   IMAGE      NAME                  STATUS
xxxxxxx        mysql:8.4  qr-attendance-mysql   Up
```

## Import the Database

After the container has started, import the project database.

```bash
docker exec -i qr-attendance-mysql mysql -uroot -proot < backend/database/scripts.sql
```

## Connect to MySQL

Using the MySQL client inside the container:

```bash
docker exec -it qr-attendance-mysql mysql -uroot -p
```

Password

```text
root
```

## Connect Using MySQL Workbench

Use the following connection settings.

| Setting  | Value     |
| -------- | --------- |
| Host     | localhost |
| Port     | 3306      |
| Username | root      |
| Password | root      |

## Stop MySQL

```bash
docker compose down
```

## Restart MySQL

```bash
docker compose up -d
```

## Remove the Database

To completely remove the database and all stored data:

```bash
docker compose down -v
```

Start the container again:

```bash
docker compose up -d
```

Re-import the database:

```bash
docker exec -i qr-attendance-mysql mysql -uroot -proot < backend/database/scripts.sql
```

## Useful Commands

View logs

```bash
docker compose logs mysql
```

Restart container

```bash
docker compose restart mysql
```

Stop container

```bash
docker compose stop mysql
```

Start container

```bash
docker compose start mysql
```

Open a shell inside the container

```bash
docker exec -it qr-attendance-mysql bash
```

## Notes

- The database is persisted using a Docker volume.
- Database data will remain available after restarting the container.
- Running `docker compose down -v` removes the database permanently.
