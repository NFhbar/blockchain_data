dc=docker-compose
.PHONY: build
build:
	$(dc) -f compose/docker.compose-api-gateway.yml -f compose/docker.compose-service-processor.yml up --build

.PHONY: down
down:
	-docker stop compose_api-gateway_1
	-docker rm compose_api-gateway_1
	-docker stop compose_redis_1
	-docker rm compose_redis_1
	-docker stop compose_processor_1
	-docker rm compose_processor_1
	-docker stop compose_processor-db_1
	-docker rm compose_processor-db_1