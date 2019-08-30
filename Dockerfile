FROM circleci/node:10.14.1 as builder

WORKDIR /usr/src/app

COPY /src /usr/src/app/src
COPY /public /usr/src/app/public
COPY /package.json /usr/src/app/package.json
COPY /tsconfig.json /usr/src/app/tsconfig.json
COPY /yarn.lock /usr/src/app/yarn.lock

RUN sudo chmod -R 777 /usr/src/app
RUN yarn install
RUN yarn build

FROM nginx:1.16.1
LABEL maintainer="https://teamdigitale.governo.it"

COPY .env.io-onboarding-pa.development /usr/share/nginx/html/.env.io-onboarding-pa.development
COPY env.sh /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN chmod +x /usr/share/nginx/html/env.sh

WORKDIR /usr/share/nginx/html

CMD ./env.sh && rm -rf env.sh && nginx -g 'daemon off;';