FROM alpine AS angular

RUN apk add npm
RUN npm install -g @angular/cli


FROM angular AS npm-installed

WORKDIR /hackathon
ADD package.json .
RUN npm install


FROM npm-installed AS builder

ADD src/app .
RUN ng build


FROM nginx:1.25-alpine3.18-slim

COPY --from=builder /hackathon/dist/bit-squid/browser /usr/share/nginx/html
