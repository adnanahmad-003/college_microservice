#!/bin/bash
set -e

DOCKER_REGISTRY=${DOCKER_REGISTRY:-"shirazdwd"}
BUILD_NUMBER=${1:-"latest"}
SERVICES=("frontend" "news" "teacher" "courses" "phd-teacher" "club")

echo "Starting deployment process..."

if [ -z "$BUILD_NUMBER" ]; then
    echo "Error: BUILD_NUMBER is required"
    exit 1
fi

echo "Pulling latest images..."
for service in "${SERVICES[@]}"; do
    if ! docker pull ${DOCKER_REGISTRY}/${service}:${BUILD_NUMBER}; then
        echo "Error pulling ${service} image"
        exit 1
    fi
done

echo "Updating service versions..."
export FRONTEND_VERSION=${BUILD_NUMBER}
export NEWS_VERSION=${BUILD_NUMBER}
export TEACHER_VERSION=${BUILD_NUMBER}
export COURSES_VERSION=${BUILD_NUMBER}

echo "Performing health check on current services..."
docker-compose ps

echo "Stopping current services..."
docker-compose down --remove-orphans

echo "Starting new services..."
if ! docker-compose up -d; then
    echo "Error starting services"
    docker-compose logs
    exit 1
fi

echo "Verifying new services..."
sleep 10
if ! docker-compose ps | grep -q "Up"; then
    echo "Error: Services failed to start properly"
    docker-compose logs
    exit 1
fi

echo "Deployment completed successfully!"