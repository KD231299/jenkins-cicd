pipeline {
    agent any

    environment {
        EC2_SSH = 'ec2-ssh'
        EC2_IP = "98.93.180.253"
    }

    stages {

        stage('Clone Repo') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )]) {

                        IMAGE = "${USER}/kishan-site:${BUILD_NUMBER}"

                        sh """
                            docker build -t ${IMAGE} .
                            echo $PASS | docker login -u $USER --password-stdin
                            docker push ${IMAGE}
                        """
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                        scp -o StrictHostKeyChecking=no deploy.sh ubuntu@${EC2_IP}:/home/ubuntu/
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "chmod +x ~/deploy.sh"
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "~/deploy.sh ${IMAGE}"
                    """
                }
            }
        }
    }
}
