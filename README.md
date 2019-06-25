Dockerized Express server - connected to smartbrain.

It has PostgreSQL database connection for user information and Redis database connection for JWT tokens.

It uses a Face-Recognition API (Clarifai) in order to find faces in pictures.

It uses Amazon Lambda in order to assign a rank depending on the number of submitted images.

To run this server:
1) Clone this repository
2) Obtain Clarifai Key (See https://clarifai.com/)
3) Obtain AWS free account and connect from terminal
4) npm install
5) docker-compose up
