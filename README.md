# MERN Boilerplate

## Description

This is a basic MERN Boilerplate with images upload, authentication and protected routes to help quick start mern projects.

The project use cloudinary to store images and mongodb atlas as database, so please be sure to have an account to use those services.

Here a link to the [demo](https://mern-boilerplate-052021.herokuapp.com/)

## Usage

### Environment variables

first create and `.env` file in the root and add the following

```
PORT= the port of your choice
JWT_SECRET= your jwt secret
MONGO_URI= your mongodb uri
CLD_CLOUD_NAME=your cloudinary cloud name
CLD_API_KEY=your cloudinary api key
CLD_API_SECRET=your cloudinary api secret
```

### Install dependencies

```
npm install
cd client 
npm install
```

### Run

```
# Run client/frontend
npm run client

# Run server/backend
npm run server

# Run both concurently
npm run dev
```

## Build and Deploy

You only to build the client/frontend.

```
# Build client/frontend
cd client
npm run build
```

you have the a script to deploy the project to heroku

```
# Deploy to heroku
npm run heroku-postbuild
```

## License
The MIT License
