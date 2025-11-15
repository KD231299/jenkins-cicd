#!/bin/bash

IMAGE=$1

docker rm -f kishan_site || true

docker pull $IMAGE

docker run -d --name kishan_site -p 80:80 --restart unless-stopped $IMAGE

