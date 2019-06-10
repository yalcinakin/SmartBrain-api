FROM node:10

WORKDIR /usr/src/smartbrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
