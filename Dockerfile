FROM node:12.2.0

# set working directory
WORKDIR /app-frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app-frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app-frontend/package.json
RUN npm install
RUN npm install -g @angular/cli@8.0.0

# add app
COPY . /app-frontend

# start app
CMD ng serve --host 0.0.0.0
