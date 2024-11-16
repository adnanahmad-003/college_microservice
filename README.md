# College Microservices Project

## Setup Instructions

1. Clone the repository
2. Copy .env.example to .env and fill in your credentials
3. Install Docker and Docker Compose
4. Run `docker-compose up -d` to start all services
5. Access the frontend at http://localhost:3000

## Development

- Each microservice can be developed independently
- Run tests with `npm test` in each service directory
- Build Docker images with `docker build -t service-name .`

## CI/CD Pipeline

The project uses Jenkins for continuous integration and deployment:
1. Commits trigger automatic builds
2. Tests are run for all services
3. Docker images are built and pushed
4. Services are deployed via Docker Compose