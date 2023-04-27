# Exploratory Search Web Application

## Running

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React
in production mode and optimizes the build for the best performance. The build
is minified and the filenames include the hashes.<br>

The web application in build can then be deployed to a web server (Apache, nginx, ...). A working solution
is offered in the `exploratory-search-gateway` repository.

## Docker Image

This repository provides a Dockerfile that builds and deploys the web application
to the `exploratory-search-gateway` solution. The gateway then only expects the location of
the running `exploratory-search-microservice`.

```
docker build . -t yyyy/esw:latest
```

Images can be found [here](https://hub.docker.com/r/khaller/esw/tags)

## Development
This project is following the Javascript [styleguide](https://github.com/airbnb/javascript) from Airbnb for Javascript and
React components.

## Contact

Kevin Haller - [contact@kevinhaller.dev](mailto:contact@kevinhaller.dev)
