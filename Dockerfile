FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy EVERYTHING from project directory
COPY . /usr/share/nginx/html/

EXPOSE 80
