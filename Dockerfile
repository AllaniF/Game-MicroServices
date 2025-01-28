FROM postgres

ENV POSTGRES_PASSWORD=docker
ENV POSTGRES_DB=EntityDb

# Copy Entity.sql to the default PostgreSQL initialization directory
COPY Entity.sql /docker-entrypoint-initdb.d/