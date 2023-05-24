# Use an node:14 image from DockerHub as a parent image
FROM node:18.15.0

# Set the working directory to /homyaksocial-backend
WORKDIR /stipaxaAI_server

# Copy required files to the image
COPY index.js .
COPY ai.js .
COPY files.js .
COPY names.json .
COPY words.json .
COPY package-lock.json .
COPY package.json .

# run npm command, which looks for package-lock.json and install all deps from where
# as result directory node_modules will be created
RUN npm install

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run npm start command when the container launches
CMD ["npm", "start"]