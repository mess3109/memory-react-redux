mysql --host=127.0.0.1 --user=root --password=root -e "CREATE DATABASE IF NOT EXISTS memory;"
mysql --host=127.0.0.1 --user=root --password=root --database=memory < ./db/schema.sql
mysql --host=127.0.0.1 --user=root --password=root --database=memory < ./db/knex_migrations.sql