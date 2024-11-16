#!/bin/bash
set -e

DOCKER_REGISTRY=${DOCKER_REGISTRY:-"your-registry"}
BUILD_NUMBER=${1:-"latest"}
SERVICES=("frontend" "news" "teacher" "courses")

echo "Starting deployment process..."

echo "Pulling latest images..."
for service in "${SERVICES[@]}"; do
    docker pull ${DOCKER_REGISTRY}/${service}:${BUILD_NUMBER}
done

echo "Updating service versions..."
export FRONTEND_VERSION=${BUILD_NUMBER}
export NEWS_VERSION=${BUILD_NUMBER}
export TEACHER_VERSION=${BUILD_NUMBER}
export COURSES_VERSION=${BUILD_NUMBER}

echo "Stopping current services..."
docker-compose down

echo "Starting new services..."
docker-compose up -d

echo "Deployment completed successfully!"