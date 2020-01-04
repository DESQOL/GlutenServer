FROM node:12.13.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build app source
RUN npm run build

EXPOSE 443

# Set the, unprivileged, user to use when running this image
# USER node
USER root

CMD [ "./scripts/wait-for-it.sh", "cache:6379", "--",  "./scripts/wait-for-it.sh", "database:3306", "--", "npm", "start" ]
