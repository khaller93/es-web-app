VERSION=`cat src/version.json | sed -e 's/"//g'`

build:
	npm run build

build-docker-image-spring:
	docker build -f docker/spring/Dockerfile . -t khaller/esw:$(VERSION)-esg1.0.0
