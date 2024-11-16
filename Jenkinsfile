pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'shirazdwd'
        DOCKER_CREDENTIALS = 'docker-hub-credentials'
        DOCKER_COMPOSE_VERSION = '2.21.0'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        dir('frontend-microservice') {
                            sh 'npm install'
                            sh 'npm test -- --watchAll=false'
                        }
                    }
                }
                stage('Test Backend Services') {
                    steps {
                        script {
                            ['news-microservice', 'teacher-microservice', 'courses-microservice'].each { service ->
                                dir(service) {
                                    sh 'npm install'
                                    sh 'npm test'
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage('Build Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir('frontend-microservice') {
                            sh 'docker build -t ${DOCKER_REGISTRY}/frontend:${BUILD_NUMBER} .'
                        }
                    }
                }
                stage('Build Backend Services') {
                    steps {
                        script {
                            def services = ['news', 'teacher', 'courses']
                            services.each { service ->
                                dir("${service}-microservice") {
                                    sh "docker build -t ${DOCKER_REGISTRY}/${service}:${BUILD_NUMBER} ."
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                        echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin ${DOCKER_REGISTRY}
                        docker push ${DOCKER_REGISTRY}/frontend:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/news:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/teacher:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/courses:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh '''
                        export FRONTEND_VERSION=${BUILD_NUMBER}
                        export NEWS_VERSION=${BUILD_NUMBER}
                        export TEACHER_VERSION=${BUILD_NUMBER}
                        export COURSES_VERSION=${BUILD_NUMBER}
                        docker-compose -f docker-compose.yml down
                        docker-compose -f docker-compose.yml up -d
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}