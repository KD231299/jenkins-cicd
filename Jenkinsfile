pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub-creds')
        EC2_SSH = 'ec2-ssh'
        EC2_IP = "98.93.180.253"
        IMAGE = "${DOCKERHUB_USR}/kishan-site:${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Repo') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE} ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh """
                    echo ${DOCKERHUB_PSW} | docker login -u ${DOCKERHUB_USR} --password-stdin
                    docker push ${IMAGE}
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([EC2_SSH]) {
                    sh """
                        scp -o StrictHostKeyChecking=no deploy.sh ubuntu@${EC2_IP}:/home/ubuntu/
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} 'chmod +x ~/deploy.sh'
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '~/deploy.sh ${IMAGE}'
                    """
                }
            }
        }
    }
}

