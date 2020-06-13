FROM node:14-alpine as react-build
WORKDIR /app

COPY . ./
ARG REACT_APP_KAKAO_MAP_API_KEY
ENV REACT_APP_KAKAO_MAP_API_KEY=$REACT_APP_KAKAO_MAP_API_KEY
ARG REACT_APP_DOMAIN_API_URL
ENV REACT_APP_DOMAIN_API_URL=$REACT_APP_DOMAIN_API_URL
RUN npm install
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
