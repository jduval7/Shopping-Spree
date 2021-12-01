FROM mongo:latest

RUN mkdir /seed/
COPY data/*.csv /seed/

COPY schema.sh /docker-entrypoint-initdb.d

