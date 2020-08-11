source .env;
docker rm -f psql
docker run --name psql -e POSTGRES_DB=${DB_NAME} -e POSTGRES_USER=${DB_USER} -e POSTGRES_PASSWORD=${DB_PASSWORD} -p 5433:5432 -d postgres
npm run start-app