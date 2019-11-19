FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE gluten
ENV MYSQL_USER test
ENV MYSQL_PASSWORD test

COPY ./data.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
