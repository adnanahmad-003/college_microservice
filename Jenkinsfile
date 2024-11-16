pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'shirazdwd'
        DOCKER_CREDENTIALS = 'docker-credentials-id'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                            def services = ['news', 'teacher', 'courses', 'phd-teacher', 'club']
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
                        docker push ${DOCKER_REGISTRY}/phd-teacher:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/club:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh './deploy.sh ${BUILD_NUMBER}'
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
