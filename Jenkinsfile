pipeline {
    agent any

    environment {
        EC2_SSH = 'ec2-ssh'
        EC2_IP  = "3.239.11.104"
    }

    triggers {
        githubPush()   // IMPORTANT: enables webhook auto trigger
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
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-creds',
                            usernameVariable: 'USER',
                            passwordVariable: 'PASS'
                        )
                    ]) {

                        def IMAGE = "${USER}/kishan-site:${BUILD_NUMBER}"

                        sh """
                            echo "$PASS" | docker login -u "$USER" --password-stdin

                            docker pull nginx:alpine || true

                            docker build -t ${IMAGE} .

                            docker push ${IMAGE}
                        """

                        // Save IMAGE variable to use in next stage
                        env.IMAGE = IMAGE
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
