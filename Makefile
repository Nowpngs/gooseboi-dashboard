run-db:
	sudo pkill -u postgres
	echo "Shutting down all containers"
	docker-compose down --remove-orphans
	echo "Starting DB"
	docker-compose up -d postgres
	echo "Logs"
	docker-compose logs -f

reset-db:
	bash reset-db.sh
	
init-backend:
	echo "Remove Old Node Modules"
	rm -rf backend/node_modules
	echo "Installing Backend Dependencies"
	cd backend && yarn install
	echo "Starting Backend"
	cd backend && yarn start:dev

run-backend:
	echo "Starting Backend"
	cd backend && yarn start:dev

init-frontend:
	echo "Remove Old Node Modules"
	rm -rf frontend/node_modules
	echo "Installing Frontend Dependencies"
	cd frontend && yarn install
	echo "Starting Frontend"
	cd frontend && yarn serve

run-frontend:
	echo "Starting Frontend"
	cd frontend && yarn serve
