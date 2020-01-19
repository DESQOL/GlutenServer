#
# ---- Base ----
FROM node:12.13.1 as base

WORKDIR /usr/src/app


#
# ---- Dependency ----
FROM base as dependencies

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Installs modules from package-lock.json, this ensures reproducible build
RUN npm --silent ci


#
# ---- Build ----
FROM dependencies as build

# Copy all files, except those ignored by .dockerignore, to the container
COPY . .

# Build the source
RUN npm --silent run build


#
# ---- Release ----
FROM build as release

# Allow HTTP access to this container
EXPOSE 80

# Wait for both the cache and database to be up before starting
CMD [ "/opt/wait-for-it.sh", "-t", "0", "cache:6379", "--",  "/opt/wait-for-it.sh", "-t", "0", "database:3306", "--", "npm", "start" ]
