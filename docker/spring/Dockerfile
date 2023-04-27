# Builder Image
FROM node:15.11-alpine3.11 AS compiler

COPY . esw
WORKDIR esw
RUN npm install && \
    npm run build && \
    mv build /build

# Main Image
FROM khaller/esg:1.0.0

COPY --from=compiler /build /webapp
