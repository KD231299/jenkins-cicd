🚀 Jenkins CI/CD Pipeline – Docker + EC2 Deployment
This project demonstrates a fully automated **CI/CD pipeline** using **Jenkins**, **Docker**, and **AWS EC2**.  
Whenever code is pushed to GitHub, the pipeline builds a Docker image, pushes it to Docker Hub, and deploys it on an EC2 instance.

📌 Architecture
GitHub → Jenkins (Webhook Trigger)
↓
Build Docker Image
↓
Push to Docker Hub
↓
SSH into EC2
↓
Pull Latest Image & Run Container

🛠️  Technologies Used
- Jenkins (Pipeline + Git Webhook)
- GitHub
- Docker & Docker Hub
- AWS EC2 (Ubuntu Server)
- SSH Agent + Credentials
- Shell Scripts

📂 Repository Structure
├── Dockerfile
├── index.html
├── style.css
├── script.js
├── deploy.sh
└── Jenkinsfile

⚙️ Jenkins Pipeline Workflo
1. Checkout Code from GitHub
Triggered automatically via webhook.
2. Build Docker Image**
docker build -t kd231299/kishan-site:<tag> .
3. Push Image to Docker Hub
docker login
docker push kd231299/kishan-site:<tag>
4. Deploy to EC2
The pipeline uses SSH to:
Copy deploy.sh
Execute it with the new image tag

📖 About
Fully automated CI/CD pipeline
Zero manual deployment
Secure credential handling
Docker-based deployment
Production-ready structure

