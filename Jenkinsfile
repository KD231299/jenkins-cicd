pipeline {
    agent any

    environment {
        EC2_SSH = 'ec2-ssh'
        EC2_IP = "98.93.180.253"
        S3_BUCKET = "kishan-site-artifacts"
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

                        IMAGE = "${USER}/kishan-site:${BUILD_NUMBER}"

                        sh """
                            echo $PASS | docker login -u $USER --password-stdin
                            docker pull nginx:alpine || true
                            docker build -t ${IMAGE} .
                            docker push ${IMAGE}
                        """
                    }
                }
            }
        }

        stage('Upload to S3') {
            steps {
                withCredentials([aws(credentialsId: 'aws-creds', accessKeyVariable: 'AWS_ACCESS_KEY', secretKeyVariable: 'AWS_SECRET_KEY')]) {
                    sh """
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY
                        aws configure set aws_secret_access_key $AWS_SECRET_KEY
                        aws configure set region ap-south-1

                        # upload files to S3
                        aws s3 sync . s3://${S3_BUCKET}/build-${BUILD_NUMBER}/ --exclude "*" --include "*.html" --include "*.css" --include "*.js"
                    """
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
