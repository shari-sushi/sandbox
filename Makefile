.PHONY: fe
fe:
	cd frontend/src && npm run dev

.PHONY: fe-build
fe-build:
	cd frontend/src && npm run build

.PHONY: fe-start
fe-start:
	cd frontend/src && npm run start

.PHONY: mysql
mysql:
	mysql -uroot -ppassword --host 127.0.0.1