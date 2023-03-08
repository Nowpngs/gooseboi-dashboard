set -e

echo 'Shutting down all containers'
docker-comspose down

echo 'Starting DB'
docker-compose up -d postgres


echo 'Dropping All DB'
docker-compose exec postgres dropdb -U postgres --if-exists gooseboi-db

echo 'Creating DB'
docker-compose exec postgres createdb -U postgres gooseboi-db