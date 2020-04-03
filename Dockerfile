FROM node:13-alpine as builder
# Set environment variables
ENV NODE_ENV=production
ENV BASE_DOMAIN=https://raw.githubusercontent.com/cavai-research/super-important-mailer/master/images
ENV IMMEDIATE=
ENV MAILGUN_DOMAIN=
ENV MAILGUN_API_KEY=
ENV MAIL_TO=
ENV MAIL_FROM=

# Set directory for all files
WORKDIR /home/node
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build project
CMD ["node", "index.js"]
