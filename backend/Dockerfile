FROM node:22-alpine3.22@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM node:22-alpine3.22@sha256:dbcedd8aeab47fbc0f4dd4bffa55b7c3c729a707875968d467aaaea42d6225af AS production
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3001
CMD [ "node", "dist/main" ]
